import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map( { searchResults } ) {

    const [selectedLocation, setSelectedLocation] = useState({});

    //transform the search result option into the
    // { latitude: 52.516272, longitude: 13.377722 } object 

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    console.log(coordinates);

    //The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });
    console.log(center);
    console.log(selectedLocation);

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/hashmianees97/ckuw9fqb02udv18qp82t8pgg9"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p className="cursor-pointer text-2xl animate-bounce" 
                            onClick={() => setSelectedLocation(result)}
                            aria-lable="push-pin"
                            role="img"
                            >📌</p>
                    </Marker>

                    {/* the popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup closedOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map;