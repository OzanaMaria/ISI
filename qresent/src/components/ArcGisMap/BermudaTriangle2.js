import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const BermudaTriangle2 = (props) => {
    
    const [graphic, setGraphic] = useState(null);
    let long = " ";
    let lat = " ";
    
   // console.log(props.courses);
    
    useEffect(() => {
        
        loadModules(['esri/Graphic', "esri/layers/GraphicsLayer","esri/geometry/Point","esri/PopupTemplate"]).then(([Graphic,GraphicsLayer,Point,PopupTemplate]) => {
            props.courses.map(course => (
                course.arr_place ===  "Bucharest" ? 
                   
                (long = "26.096", lat = "44.439") : 
                (course.arr_place ===  "Cluj"? (long = "23.6", lat = "46.76"): 
                (course.arr_place ===  "Iasi"? (long = "27.57", lat = "47.16"):  
                (course.arr_place ===  "Brasov"? (long = "25.6", lat = "45.56"):
                (long = " ", lat = " "))))

            ))
           
            // Create a polygon geometry
            const polygon = {
                type: "point", // autocasts as new Polygon()
                longitude: long,
                latitude: lat
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

export default BermudaTriangle2;