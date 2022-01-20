import React from 'react';
import ReactDOM from 'react-dom';

import { Scene } from 'react-arcgis';
import {Map} from 'react-arcgis';
import BermudaTriangle from './BermudaTriangle';
import BermudaTriangle2 from './BermudaTriangle2';
import MyFeatureLayer from './MyFeatureLayer';
import { database, auth } from "../../firebase";
import { id } from 'date-fns/locale';
import { loadModules } from 'esri-loader';
const handleMapLoad = function (map, view) {
  loadModules(["esri/widgets/Search","esri/rest/locator"]).then(([Search,locator]) => {
    const locatorUrl =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

    const searchWidget = new Search({
      view: view
    });
    view.ui.add(searchWidget, {
      position: "top-right"
    });

    view.popup.autoOpenEnabled = false;
    view.on("click", (event) => {
      // Get the coordinates of the click on the view
      const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
      const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

      view.popup.open({
        // Set the popup's title to the coordinates of the location
        title: "Reverse geocode: [" + lon + ", " + lat + "]",
        location: event.mapPoint // Set the location of the popup to the clicked location
      });

      const params = {
        location: event.mapPoint
      };

      // Display the popup
      // Execute a reverse geocode using the clicked location
      locator
        .locationToAddress(locatorUrl, params)
        .then((response) => {
          // If an address is successfully found, show it in the popup's content
          view.popup.content = response.address;
        })
        .catch(() => {
          // If the promise fails and no result is found, show a generic message
          view.popup.content = "No address was found for this location";
        });
    });
  });
};
class ShowMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        courses: [],
        email: ""
        
    }
}
async componentDidMount() {
  let coursesList = [];
  const subjectsRefs = database.ref('transpOffer');
  const contractsRefs = database.ref('contract');
  const clientsOfferRefs = database.ref('materii');
  const email = auth.currentUser.email;
 
      await contractsRefs.on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
              const childData = childSnapshot.val();
              const nume = childData.name;
              //console.log(childData.email_client);
              //console.log(email);
              if(childData.id === this.props.match.params.id){
                  coursesList.push(childData);
                }

              
          });
         // console.log(coursesList);
          this.setState({ courses : coursesList, email: email });
      });
  
}
 
  render() {

    return (
      <div>
      {this.state.courses.length &&
      (<Map
      style={{ width: '100vw', height: '100vh' }}
      mapProperties={{  basemap: "streets-vector" }}
      onLoad = {handleMapLoad}
      viewProperties={{
        center: [26.096, 44.439],
        zoom: 10,
        
    }}>
    
      <BermudaTriangle courses = {(this.state.courses)} />
    
    <MyFeatureLayer
      featureLayerProperties={{
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0',
       
      }}
    >
    </MyFeatureLayer>
  </Map>)
    }
    </div>
 );

}

      
}



export default ShowMap;