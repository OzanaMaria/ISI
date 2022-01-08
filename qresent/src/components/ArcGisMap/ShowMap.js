import React from 'react';
import { loadModules } from 'esri-loader';
import "./ShowMap.css";
class ShowMap extends React.Component {
  
  render() {
    return <div id="viewDiv">{this.renderMarker()}</div>;
  }

  

  renderMarker() {

    loadModules(["esri/Map","esri/layers/FeatureLayer", "esri/views/MapView","esri/widgets/Legend"])
    .then(([Map, FeatureLayer, MapView, Legend]) => {
      const map = new Map({
        basemap: "gray-vector"
      });

      // Create the MapView
      const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-73.95, 40.702],
        zoom: 10
      });
      view.ui.add(new Legend({ view: view }), "bottom-left");
    const template = {
      title : "{Name}",
      content: [
        {
          // It is also possible to set the fieldInfos outside of the content
          // directly in the popupTemplate. If no fieldInfos is specifically set
          // in the content, it defaults to whatever may be set within the popupTemplate.
          type: "fields",
          fieldInfos: [
            {
              fieldName: "B12001_calc_pctMarriedE",
              label: "Married %"
            },
            {
              fieldName: "B12001_calc_numMarriedE",
              label: "People Married",
              format: {
                digitSeparator: true,
                places: 0
              }
            },
            {
              fieldName: "B12001_calc_numNeverE",
              label: "People that Never Married",
              format: {
                digitSeparator: true,
                places: 0
              }
            },
            {
              fieldName: "B12001_calc_numDivorcedE",
              label: "People Divorced",
              format: {
                digitSeparator: true,
                places: 0
              }
            }
          ]
        }
      ]
    };

    const featureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2",
      popupTemplate: template
    });
    console.log("aici");
    map.add(featureLayer);  
    }).catch((err) => console.error(err));
  }
}


export default ShowMap;