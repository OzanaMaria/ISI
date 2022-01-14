import React from 'react';
import {loadModules} from 'react-arcgis';

class EsriMarker extends React.Component {
  render() {
    return null;
  }

  componentWillMount() {
    this.renderMarker();
  }

  renderMarker() {
    loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/PopupTemplate"
    ]).then(([GraphicsLayer, Graphic, Point, PopupTemplate]) => {

      const markerLayer = new GraphicsLayer();
      this.props.markers.forEach((marker) => {
        const point = new Point({
          longitude: marker.position.lng,
          latitude: marker.position.lat
        });

        const markerSymbol = {
          type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
          url: "http://nobacks.com/wp-content/uploads/2014/11/Glass-of-Beer-8.png",
          width: "142px",
          height: "167px"
        };

        const theAtt = {
          Name: "some name",
          Owner: "some Owner",
          Length: "some lengthß"
        };

        const pop = new PopupTemplate({
          title: "pop title",
          content: '<div className="info">ID: someID ' + '<br/><span>ZONE: someZone </span>'
        });

        const graphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
          attributes: theAtt,
          popupTemplate: pop
        });

        markerLayer.add(graphic);
      });

      this.props.map.add(markerLayer);
    }).catch((err) => console.error(err));
  }
}
export default EsriMarker;