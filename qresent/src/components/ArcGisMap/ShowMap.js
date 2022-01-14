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

          center: [172.58804957425, -43.5106019527023],

          zoom: 25

      }}>



       <EsriMarker  {...this.props}/>



    </Scene>

 );

}

      
}



export default ShowMap;