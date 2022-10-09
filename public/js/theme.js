import { displayMap } from './mapbox.js'

let dataTheme = window.localStorage.getItem("data-theme");

const mapbox = document.getElementById('map')
if(mapbox){
    var locations = JSON.parse( mapbox.dataset.location)
    var mapLightStyle = mapbox.dataset.maplightstyle || 'mapbox://styles/sipun834/cl81vp825007q14pmc4eohld0'
    var mapDarkStyle = mapbox.dataset.mapdarkstyle || 'mapbox://styles/sipun834/cl916b4dl000k14n3vrsnsspk'
    var accessToken =  mapbox.dataset.maptoken
}


if (!dataTheme) {
    dataTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    if(mapbox){
        const style = (dataTheme === 'dark') ? mapDarkStyle : mapLightStyle
        displayMap(locations, style,accessToken)
    }
    window.localStorage.setItem("data-theme", dataTheme);

} else {
    document.documentElement.setAttribute("data-theme", dataTheme);
    if(mapbox){
        const style = (dataTheme === 'dark') ? mapDarkStyle : mapLightStyle
        displayMap(locations, style,accessToken)
    }
}

const lightbulb = document.getElementById("lightbulb");

lightbulb.onclick = (e) => {
    e.preventDefault();

    dataTheme = (dataTheme == "dark") ? "light" : "dark";

    window.localStorage.setItem("data-theme", dataTheme);
    document.documentElement.setAttribute("data-theme", dataTheme);
    if(mapbox){
        const style = (dataTheme === 'dark') ? mapDarkStyle : mapLightStyle
        displayMap(locations, style,accessToken)
    }
}
