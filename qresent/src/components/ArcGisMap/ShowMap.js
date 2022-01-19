import React from 'react';
import ReactDOM from 'react-dom';

import { Scene } from 'react-arcgis';
import {Map} from 'react-arcgis';
import BermudaTriangle from './BermudaTriangle';
import MyFeatureLayer from './MyFeatureLayer';
import { database, auth } from "../../firebase";
import { id } from 'date-fns/locale';
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
      viewProperties={{
        center: [26.096, 44.439],
        zoom: 10
    }}>
     
      <BermudaTriangle courses = {(this.state.courses)} />
    <MyFeatureLayer
      featureLayerProperties={{
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0'
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