import React from 'react';
import ReactDOM from 'react-dom';

import { Scene } from 'react-arcgis';
import {Map} from 'react-arcgis';
import BermudaTriangle from './BermudaTriangle';
import MyFeatureLayer from './MyFeatureLayer';
class ShowMap extends React.Component {
  
  render() {

    return (

      <Map
      style={{ width: '100vw', height: '100vh' }}
      mapProperties={{  basemap: "streets-vector" }}
      viewProperties={{
        center: [26.096, 44.439],
        zoom: 10
    }}>
      <BermudaTriangle />
    <MyFeatureLayer
      featureLayerProperties={{
        url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0'
      }}
    >
    </MyFeatureLayer>
  </Map>

 );

}

      
}



export default ShowMap;