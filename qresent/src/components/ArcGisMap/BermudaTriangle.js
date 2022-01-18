import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const BermudaTriangle = (props) => {

    const [graphic, setGraphic] = useState(null);
    useEffect(() => {

        loadModules(['esri/Graphic', "esri/layers/GraphicsLayer","esri/geometry/Point","esri/PopupTemplate"]).then(([Graphic,GraphicsLayer,Point,PopupTemplate]) => {
            // Create a polygon geometry
            const polygon = {
                type: "point", // autocasts as new Polygon()
                longitude: 26.096,
                latitude: 44.439
            };

            // Create a symbol for rendering the graphic
            const fillSymbol = {
                type: "simple-marker", // autocasts as new SimpleFillSymbol()
                color: [226, 119, 40],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            };
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
            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol,
                attributes: theAtt,
                popupTemplateL: pop
            });
            setGraphic(graphic);
            props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, [ graphic, props ]);

    return null;

}

export default BermudaTriangle;