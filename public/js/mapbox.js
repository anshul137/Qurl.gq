
export const displayMap = (locations,style, accessToken) => {
    mapboxgl.accessToken = accessToken
    
    var map = new mapboxgl.Map({
        container: 'map',
        style // this is the link from the mapbox studio
        
    } );

    const bounds = new mapboxgl.LngLatBounds(); // bounds are used for fitting the map to certain location

    locations.forEach(loc => {
        //create a new element with class name marker
        const el = document.createElement('div')
        el.className = 'marker'

        // add above as Marker
        new mapboxgl.Marker( {
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map)

        
        // add the loc to the bounds
        //extends the map bounds to include current location
        bounds.extend(loc.coordinates )
    });

    /// zoom out /in feature editing and actaully exexute the options made
    // above
    map.fitBounds(bounds , {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    })
}

// displayMap(locations)