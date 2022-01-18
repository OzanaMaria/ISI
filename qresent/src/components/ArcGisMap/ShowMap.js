import React from 'react';
import {loadModules} from 'react-arcgis';
import EsriLoaderReact from 'esri-loader-react';
import { Scene } from 'react-arcgis';
import EsriMarker from './EsriMarker';
class ShowMap extends React.Component {
  render() {

    return (

    <Scene style={{ width: '100vw', height: '100vh' }}

      mapProperties={{ basemap: 'streets-navigation-vector' }}

      viewProperties={{

          center: [26.096306, 44.439663],

          zoom: 7

      }}>



       <EsriMarker  {...this.props}/>



    </Scene>

 );

}

      
}



export default ShowMap;