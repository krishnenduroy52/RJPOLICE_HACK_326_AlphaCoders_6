import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import customMarkerImage from "../assets/marker2.png";
const API_Key = import.meta.env.VITE_APP_TOMTOM_APIKEY;

// console.log(API_Key);
const Map = () => {
  const zoomLevel = 18;
  const baseVisibility = 200;
  const [currentLoc, setCurrentLoc] = useState(null);
  const mapRef = useRef(null);
  const targetRef = useRef(null);
  const [camLoc, setCamLoc] = useState([
    // { lng: 88.4147, lat: 22.63296 },
    // { lng: 88.4132, lat: 22.6318 },
    // { lng: 88.4161, lat: 22.6342 },
    // { lng: 88.4155, lat: 22.6319 },
    // { lng: 88.4158, lat: 22.6339 },
    // { lng: 88.4138, lat: 22.6345 },
    // { lng: 88.4148, lat: 22.6338 },
    // { lng: 88.4136, lat: 22.6325 },
    // { lng: 88.416, lat: 22.6345 },
    // { lng: 88.4144, lat: 22.6317 },
    // { lng: 88.4153, lat: 22.6335 },

    // { lng: 87.062078, lat: 23.246138 },
    // { lng: 87.062365, lat: 23.246037 },
    // { lng: 87.06214, lat: 23.246288 },
    // { lng: 87.062458, lat: 23.246318 },
    // { lng: 87.062565, lat: 23.245067 },
    // { lng: 87.06315, lat: 23.246485 },
    // { lng: 88.46151927985295, lat: 22.97254978998012 },
    // { lng: 87.06213715563548, lat: 23.247591673681136 },

    // { lng: 87.06229004645155, lat: 23.24609364561834 },
    // { lng: 87.06237813671609, lat: 23.246071958068956 },
    // { lng: 87.06244262319764, lat: 23.246012706600133 },
    // { lng: 87.0624662267955, lat: 23.245931767631046 },
    // { lng: 87.06244262301246, lat: 23.24585082871107 },
    // { lng: 87.06237813653094, lat: 23.245791577340473 },
    // { lng: 87.06229004645155, lat: 23.245769889840208 },
    // { lng: 87.06220195637215, lat: 23.245791577340473 },
    // { lng: 87.06213746989063, lat: 23.24585082871107 },
    // { lng: 87.0621138661076, lat: 23.245931767631046 },
    // { lng: 87.06213746970545, lat: 23.246012706600133 },
    // { lng: 87.062201956187, lat: 23.246071958068956 },

    // { lat: 23.245898802921474, lng: 87.06244005167302 },
    // { lat: 23.245973802921473, lng: 87.06241995548359 },
    // { lat: 23.24602870673204, lng: 87.06236505167301 },
    // { lat: 23.246048802921475, lng: 87.06229005167302 },
    // { lat: 23.24602870673204, lng: 87.06221505167302 },
    // { lat: 23.245973802921473, lng: 87.06216014786244 },
    // { lat: 23.245898802921474, lng: 87.06214005167301 },
    // { lat: 23.245823802921475, lng: 87.06216014786244 },
    // { lat: 23.245768899110907, lng: 87.06221505167302 },
    // { lat: 23.245748802921472, lng: 87.06229005167302 },
    // { lat: 23.245768899110907, lng: 87.06236505167301 },
    // { lat: 23.245823802921475, lng: 87.06241995548359 }

    // center point
    { lat: 23.24581974776096, lng: 87.06231163376515, angle: 30 },
    // { lat: 23.245900686631824, lon: 87.0624642103831 },
    // { lat: 23.245900686631824, lon: 87.06215905714718 },

    { lat: 23.246011691904293, lng: 87.0623834307344, angle: 300 },

    { lat: 23.245871501466382, lng: 87.0621191602453, angle: 150 },
  ]);

  const userDetails = [
    {
      name: "Indrajit Pal",
      phone: "+1 123-456-7890",
      cameraId: "CAM-001",
      angle: 30,
      lat: 23.24581974776096,
      lng: 87.06231163376515,
    },
    {
      name: "Krishnendu Roy",
      phone: "+1 123-456-7890",
      cameraId: "CAM-002",
      angle: 300,
      lat: 23.246011691904293,
      lng: 87.0623834307344,
    },
    {
      name: "Anurag Kumar Sah",
      phone: "+1 123-456-7890",
      cameraId: "CAM-003",
      angle: 150,
      lat: 23.245871501466382,
      lng: 87.0621191602453,
    },
  ]

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
      zoom: 18,
      style: {
        map: '2/basic_street-satellite',
        poi: 'poi_main',
        trafficIncidents: '2/flow_relative-light',
        trafficFlow: '2/flow_relative-light'
      }
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

  const createCustomMarkerElement = () => {
    const currentZoom = map.getZoom();
    const baseSize = baseVisibility;
    const newSize = baseSize * (1 / 2 ** (zoomLevel - currentZoom));
    const markerWidth = Math.max(newSize, 0.00000000001);
    const markerHeight = Math.max(newSize, 0.00000000001);

    const markerElement = document.createElement("div");
    markerElement.style.backgroundImage = `url(${customMarkerImage})`;
    markerElement.style.width = `${markerWidth}px`;
    markerElement.style.height = `${markerHeight}px`;
    markerElement.style.backgroundSize = "cover";
    markerElement.style.opacity = 0.8;

    return markerElement;
  };

  function createField(label, value) {
    const fieldDiv = document.createElement("div");
    fieldDiv.style.marginBottom = "5px";

    const labelSpan = document.createElement("span");
    labelSpan.textContent = `${label}: `;
    labelSpan.style.fontWeight = "bold";

    const valueSpan = document.createElement("span");
    valueSpan.textContent = value;

    fieldDiv.appendChild(labelSpan);
    fieldDiv.appendChild(valueSpan);

    return fieldDiv;
  }

  function onViewCCTVClick() {
    alert("Viewing CCTV...");
  }

  function createCard(user) {
    const card = document.createElement("div");
    card.className = "marker";
    card.style.border = "2px solid green";
    card.style.borderRadius = "10px";
    card.style.width = "200px";
    card.style.height = "150px";
    card.style.backgroundSize = "cover";
    card.style.position = "relative";

    const infoDiv = document.createElement("div");
    infoDiv.style.padding = "5px";

    const nameField = createField("Name", `${user.name}`);
    const phoneField = createField("Phone", `${user.phone}`);
    const cameraIdField = createField("CameraID", `${user.cameraId}`);

    const viewCCTVButton = document.createElement("button");
    viewCCTVButton.textContent = "View CCTV";
    viewCCTVButton.style.marginTop = "10px";
    viewCCTVButton.style.marginLeft = "10px";
    viewCCTVButton.style.padding = "10px";
    viewCCTVButton.style.position = "absolute";
    viewCCTVButton.style.borderRadius = "10px";
    viewCCTVButton.style.backgroundColor = "#13EC88";
    viewCCTVButton.style.color = "white";
    viewCCTVButton.style.border = "none";
    viewCCTVButton.style.cursor = "pointer";
    viewCCTVButton.style.outline = "none";

    viewCCTVButton.addEventListener("click", onViewCCTVClick);

    infoDiv.appendChild(nameField);
    infoDiv.appendChild(phoneField);
    infoDiv.appendChild(cameraIdField);
    infoDiv.appendChild(viewCCTVButton);
    card.appendChild(infoDiv);
    return card;
  }

  useEffect(() => {
    map && map.on("click", addMarker);

    map &&
      userDetails &&
      userDetails.forEach((user) => {
        let loc = { lng: user.lng, lat: user.lat, angle: user.angle };
        const popup = new tt.Popup({
          offset: popupOffsets,
          className: "map_marker_popup",
        })
          .setLngLat(loc)
          .setDOMContent(createCard(user))
          .addTo(map);

        const customMarker = new tt.Marker({
          element: createCustomMarkerElement(),
          anchor: "center",
          rotation: loc.angle,
          clickTolerance: "20",
        })
          .setLngLat(loc)
          .addTo(map);

        const marker = new tt.Marker({
          // height: "22",
          // width: "18",
          clickTolerance: "20",
        })
          .setPopup(popup)
          .setLngLat(loc)
          .addTo(map);

        setMarkers((prev) => [...prev, customMarker]);
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

  // Need to be checked
  function getClosestLocations(targetCoord, locations, numClosest) {
    const sortedLocations = locations.slice().sort((a, b) => {
      const distanceA = haversineDistance(targetCoord, { lat: a.lat, lng: a.lng });
      const distanceB = haversineDistance(targetCoord, { lat: b.lat, lng: b.lng });
      return distanceA - distanceB;
    });

    return sortedLocations.slice(0, numClosest);
  }

  const clear = () => {
    markers && markers.forEach((marker) => marker.remove());
    setMarkers([]);
  };

  const makeMarkers = (user, numClosest) => {
    for (let i = 0; i < user.length; i++) {
      if (i < numClosest) {
        let loc = { lng: user[i].lng, lat: user[i].lat };
        const popup = new tt.Popup({
          offset: popupOffsets,
          className: "map_marker_popup",
        })
          .setDOMContent(createCard(user[i]))
          .addTo(map);

        const customMarker = new tt.Marker({
          element: createCustomMarkerElement(),
          anchor: "center",
          rotation: user[i].angle,
          clickTolerance: "20",
        })
          .setLngLat(loc)
          .addTo(map);

        const marker = new tt.Marker({
          // height: "22",
          // width: "18",
          color: "#13EC88",
          clickTolerance: "20",
        })
          .setPopup(popup)
          .setLngLat(loc)
          .addTo(map);

        setMarkers((prev) => [...prev, customMarker]);
      } else {
        let loc = { lng: user[i].lng, lat: user[i].lat };
        const popup = new tt.Popup({
          offset: popupOffsets,
          className: "map_marker_popup",
        })
          .setDOMContent(createCard(user))
          .addTo(map);

        const marker = new tt.Marker({ clickTolerance: "20" })
          .setPopup(popup)
          .setLngLat(loc)
          .addTo(map);
        setMarkers((prev) => [...prev, marker]);
      }
    }
  };

  useEffect(() => {
    const handleZoomChange = () => {
      const currentZoom = map.getZoom();

      markers.forEach((marker) => {
        const baseSize = baseVisibility;
        const newSize = baseSize * (1 / 2 ** (zoomLevel - currentZoom));

        if (marker.getElement()) {
          marker.getElement().style.width = `${Math.max(
            newSize,
            0.00000000001
          )}px`;
          marker.getElement().style.height = `${Math.max(
            newSize,
            0.00000000001
          )}px`;
        }
      });
    };

    if (map) {
      map.on("zoom", handleZoomChange);
    }

    return () => {
      if (map) {
        map.off("zoom", handleZoomChange);
      }
    };
  }, [map, markers]);

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
    const locations = getClosestLocations( // need to be checked
      { lng: e.lngLat.lng, lat: e.lngLat.lat },
      userDetails,
      1
    );
    clear();
    makeMarkers(locations, 1); //previous code
    // makeMarkers(userDetails, 6); // new code

    map && map.off("click", addTarget);
  };

  const getCoordinates = () => {
    map && map.on("click", addTarget);
  };

  const reset = () => {
    clear();
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.getElement())
    );
    makeMarkers(userDetails, 0);
    targetRef.current && targetRef.current.remove();
  };

  return (
    <div
      className="map_container"
      style={{
        backgroundColor: "white",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className="map_wrapper" style={{ borderRadius: "10px" }}>
        <div
          ref={mapRef}
          className="main_map"
          style={{ borderRadius: "10px" }}
        ></div>
      </div>
      <div className="form_container">
        <h3>Click on the map and set target to get closest camera</h3>
        <div className="lng_lat_container">
          <p>
            Latitude:{" "}
            <span className="lng_lat">
              {targetRef.current && targetRef.current.getLngLat().lat}
            </span>
          </p>
          <p>
            Longitude:{" "}
            <span className="lng_lat">
              {targetRef.current && targetRef.current.getLngLat().lng}
            </span>
          </p>
        </div>
        <div>
          <button className="map_form_button" onClick={getCoordinates}>
            Add target
          </button>
          <button className="map_form_button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
