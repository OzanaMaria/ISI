import { setDefaultOptions } from "esri-loader"
import { useEffect } from "react"
import { loadModules } from "react-arcgis";

const MapRoutes = (props) => {
    useEffect(() => {
        setDefaultOptions({ css : true});
        loadModules(["esri/config", 'esri/Graphic', "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet"])
        .then(([esriConfig, Graphic, route, RouteParameters, FeatureSet]) => {
            esriConfig.apiKey = API_KEY;
            const routeParams = new RouteParameters({
                stops: new FeatureSet({
                    features: props.view.graphics.toArray()
                }),
            });

        route.solve(routeUrl, routeParams)
        .then((data) => {
            data.routeResults.forEach((result) => {
            result.route.symbol = {
                type: "simple-line",
                color: [5, 150, 255],
                width: 3
            };
            props.view.graphics.add(result.route);
        });
        })
    });
    });
    return null;
}

export default MapRoutes;