import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { database } from "../../firebase";

const BermudaTriangle = (props) => {
    
    const [graphic, setGraphic] = useState(null);
    let long = " ";
    let lat = " ";
    let long2 = " ";
    let lat2 = " ";


    useEffect(() => {
        
        loadModules(['esri/Graphic', "esri/layers/GraphicsLayer","esri/geometry/Point","esri/PopupTemplate","esri/rest/route","esri/rest/support/RouteParameters"]).then(([Graphic,GraphicsLayer,Point,PopupTemplate, route, RouteParam]) => {
            const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
            
            const coordRefs = database.ref('coord');
            let ver = 1;
            let childData = "";
            let cs;

            coordRefs.on('value', snapshot => {
                
                snapshot.forEach(childSnapshot => {
                    if(ver == 1){
                    childData = childSnapshot.val();
                    ver = 2;
                    cs = childSnapshot;
                    }
                });
            });     

            let markerLayer = new GraphicsLayer();

            if(childData == ""){
            props.courses.map(course => (
                course.dep_place ===  "Bucharest" ? 
                   
                (long = "26.096", lat = "44.439") : 
                (course.dep_place ===  "Buzau"? (long = "26.82", lat = "45.15"): 
                (course.dep_place ===  "Ploiesti"? (long = "26.01", lat = "44.95"):  
                (course.dep_place ===  "Pitesti"? (long = "24.86", lat = "44.85"):
                (long = " ", lat = " "))))

            ))
            }else{
                long = childData.long;
                lat = childData.lat;
                coordRefs.child(cs.key).remove();
            }
                
            props.courses.map(course => (
                course.arr_place ===  "Bucharest" ? 
                   
                (long2 = "26.096", lat2 = "44.439") : 
                (course.arr_place ===  "Buzau"? (long2 = "26.82", lat2 = "45.15"): 
                (course.arr_place ===  "Ploiesti"? (long2 = "26.01", lat2 = "44.95"):  
                (course.arr_place ===  "Pitesti"? (long2 = "24.86", lat2 = "44.85"):
                (long2 = " ", lat2 = " "))))

            ))
          
            // Create a polygon geometry
            const polygon = {
                type: "point", // autocasts as new Polygon()
                longitude: long,
                latitude: lat
            };
            const polygon2 = {
                type: "point", // autocasts as new Polygon()
                longitude: long2,
                latitude: lat2
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
                url: "../Dashboard/react-logo.png",
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
            });
            const graphic2 = new Graphic({
                geometry: polygon2,
                symbol: fillSymbol,
            });
            const markergraphic = new Graphic({
                geometry: polygon2,
                symbol: markerSymbol,
                attributes: theAtt,
                popupTemplate: pop
            });
            setGraphic(graphic);
            markerLayer.add(markergraphic);
            props.view.graphics.push(graphic, graphic2);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
            //props.view.graphics.remove(graphic2);
        };
    }, [ graphic, props ]);

    return null;

}

export default BermudaTriangle;