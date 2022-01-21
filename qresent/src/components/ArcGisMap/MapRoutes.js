import { setDefaultOptions } from "esri-loader"
import { useEffect } from "react"
import { loadModules } from "react-arcgis";

const MapRoutes = (props) => {
    useEffect(() => {
        setDefaultOptions({ css : true});
        loadModules(["esri/config", 'esri/Graphic', "esri/rest/route", "esri/rest/support/RouteParameters", "esri/rest/support/FeatureSet"])
        .then(([esriConfig, Graphic, route, RouteParameters, FeatureSet]) => {
            esriConfig.apiKey =  "AAPKb5d54d0f5bed4904a1412ffd1e131102PBWOZNi5MMDx9pBPBfsiEuDbfHW6kI6-Blr5538w5uYYaHtgAni96u-_ZJkUxF9x";
            const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
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