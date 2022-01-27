import React from 'react';
import ReactDOM from 'react-dom';

import { Scene } from 'react-arcgis';
import {Map} from 'react-arcgis';
import BermudaTriangle from './BermudaTriangle';
import MyFeatureLayer from './MyFeatureLayer';
import { database, auth } from "../../firebase";
import { id } from 'date-fns/locale';
import { loadModules } from 'esri-loader';
import MapRoutes from './MapRoutes.js';
let id2;



const handleMapLoad = function (map, view, courses) {

  let lat = 0;
  let long = 0;
  let nameTruck;
  let dpplace;
  let arvplace;
  let trucksNameList = [];
    const trucksRefs = database.ref('contract');

    trucksRefs.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            if(childData.id === id2){
                trucksNameList.push(childData);
                nameTruck = childData.id;
                dpplace = childData.dep_place;
                arvplace = childData.arr_place;
                if(childData.dep_place ===  "Bucharest"){
                  long = "26.096";
                  lat = "44.439";
                }
                if(childData.dep_place ===  "Buzau"){
                  long = "26.82"; lat = "45.15";
                }
                if(childData.dep_place ===  "Ploiesti"){
                  long = "26.01"; lat = "44.95";
                }
                if(childData.dep_place ===  "Pitesti"){
                  long = "24.86"; lat = "44.85";
                }
            }
        });
    }); 

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

      view.popup.open({
        // Set the popup's title to the coordinates of the location
        
        title: "Name: " + nameTruck + " \ncoordonates: [" + long + ", " + lat + "]\n Departure Place: " + dpplace +"\n Arrival Place: " + arvplace,
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
  let coordList = [];
  const subjectsRefs = database.ref('transpOffer');
  const contractsRefs = database.ref('contract');
  const clientsOfferRefs = database.ref('materii');
  const coordRefs = database.ref('coord');
  const email = auth.currentUser.email;
  id2 = this.props.match.params.id;
      await contractsRefs.on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
              const childData = childSnapshot.val();
              const nume = childData.name;
              if(childData.id === this.props.match.params.id){
                  coursesList.push(childData);
                }

              
          });
          this.setState({ courses : coursesList, email: email});
        
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
    <MapRoutes/>
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