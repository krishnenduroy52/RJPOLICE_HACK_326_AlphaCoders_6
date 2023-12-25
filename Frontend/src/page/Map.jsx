import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";

const API_Key = import.meta.env.VITE_APP_TOMTOM_APIKEY;

console.log(API_Key);
const Map = () => {
  const [currentLoc, setCurrentLoc] = useState(null);
  const mapRef = useRef(null);
  const targetRef = useRef(null);
  const [camLoc, setCamLoc] = useState([
    { lng: 88.4147, lat: 22.63296 },
    { lng: 88.4132, lat: 22.6318 },
    { lng: 88.4161, lat: 22.6342 },
    { lng: 88.4155, lat: 22.6319 },
    { lng: 88.4158, lat: 22.6339 },
    { lng: 88.4138, lat: 22.6345 },
    { lng: 88.4148, lat: 22.6338 },
    { lng: 88.4136, lat: 22.6325 },
    { lng: 88.416, lat: 22.6345 },
    { lng: 88.4144, lat: 22.6317 },
    { lng: 88.4153, lat: 22.6335 },
    { lng: 87.062078, lat: 23.246138},
    { lng: 87.062365, lat: 23.246037},
    { lng: 87.062140, lat: 23.246288},
    { lng: 87.062458, lat: 23.246318},
    { lng: 87.062565, lat: 23.245067},
    { lng: 87.063150, lat: 23.246485},
  ]);

  const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState(null);

  const markerHeight = 50,
    markerRadius = 10,
    linearOffset = 25;

  const popupOffsets = useMemo(() => {
    return {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -markerHeight],
      "bottom-left": [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      "bottom-right": [
        -linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };
  }, [markerHeight, markerRadius, linearOffset]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLoc({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        () => {
          alert(
            "Unable to retrieve your location, Please enable Geolocation and reload to continue...."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!currentLoc) return;
    const mp = tt.map({
      key: API_Key,
      container: mapRef.current,
      center: currentLoc,
      zoom: 20,
    });
    setMap(mp);
    return () => mp.remove();
  }, [currentLoc]);

  const addCamera = (lat, lng) => {
    setCamLoc((prev) => [...prev, [lng, lat]]);
  };

  const addMarker = useCallback((e) => {
    const lngLat = e.lngLat;
    console.log(lngLat);
    addCamera(lngLat.lat, lngLat.lng);
  }, []);

  useEffect(() => {
    map && map.on("click", addMarker);

    map &&
      camLoc &&
      camLoc.forEach((loc) => {
        const popup = new tt.Popup({
          offset: popupOffsets,
          className: "map_marker_popup",
        })
          .setLngLat(loc)
          .setHTML("<h1>Hi it's popup</h1>")
          .addTo(map);
        const marker = new tt.Marker()
          .setPopup(popup)
          .setLngLat(loc)
          .addTo(map);

        setMarkers((prev) => [...prev, marker]);
      });
    map && map.off("click", addMarker);
    return () => {
      map && map.off("click", addMarker);
    };
  }, [map, camLoc, addMarker, popupOffsets]);

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function haversineDistance(coord1, coord2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(coord2.lat - coord1.lat);
    const dLng = toRadians(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(coord1.lat)) *
        Math.cos(toRadians(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function getClosestLocations(targetCoord, locations) {
    const sortedLocations = locations.slice().sort((a, b) => {
      return (
        haversineDistance(targetCoord, a) - haversineDistance(targetCoord, b)
      );
    });

    return sortedLocations;
  }

  const clear = () => {
    markers && markers.forEach((marker) => marker.remove());
    setMarkers([]);
  };

  const makeMarkers = (locations, numClosest) => {
    for (let i = 0; i < locations.length; i++) {
      if (i < numClosest) {
        const popup = new tt.Popup({
          offset: popupOffsets,
          className: "map_marker_popup",
        })
          .setHTML("<h1>Hi from user</h1>")
          .addTo(map);
        const marker = new tt.Marker({ color: "#13EC88", clickTolerance: "20" })
          .setPopup(popup)
          .setLngLat(locations[i])
          .addTo(map);
        setMarkers((prev) => [...prev, marker]);
      } else {
        const popup = new tt.Popup({
          offset: popupOffsets,
          className: "map_marker_popup",
        })
          .setHTML("<h1>Hi from user</h1>")
          .addTo(map);
        const marker = new tt.Marker({ clickTolerance: "20" })
          .setPopup(popup)
          .setLngLat(locations[i])
          .addTo(map);
        setMarkers((prev) => [...prev, marker]);
      }
    }
  };

  const addTarget = (e) => {
    if (!map) return;
    const popup = new tt.Popup({
      offset: popupOffsets,
      className: "map_marker_popup",
    })
      .setHTML("<h1>Target</h1>")
      .addTo(map);
    const marker = new tt.Marker({ color: "#ec1377", clickTolerance: "20" })
      .setPopup(popup)
      .setLngLat(e.lngLat)
      .addTo(map);
    targetRef.current = marker;
    const locations = getClosestLocations(
      { lng: e.lngLat.lng, lat: e.lngLat.lat },
      camLoc,
      6
    );
    clear();
    makeMarkers(locations, 6);

    map && map.off("click", addTarget);
  };

  const getCoordinates = () => {
    map && map.on("click", addTarget);
  };

  const reset = () => {
    clear();
    makeMarkers(camLoc, 0);
    targetRef.current && targetRef.current.remove();
  }

  return (
    <div className="map_container">
      <div className="map_wrapper">
        <div ref={mapRef} className="main_map"></div>
      </div>
      <div className="form_container">
        <h3>Click on the map and set target to get closest camera</h3>
        <div className="lng_lat_container">
          <p>Latitude: <span className="lng_lat">{targetRef.current && targetRef.current.getLngLat().lat}</span></p>
          <p>Longitude: <span className="lng_lat">{targetRef.current && targetRef.current.getLngLat().lng}</span></p>
        </div>
        <div>
        <button className="map_form_button" onClick={getCoordinates}>Add target</button>
        <button className="map_form_button" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Map;
