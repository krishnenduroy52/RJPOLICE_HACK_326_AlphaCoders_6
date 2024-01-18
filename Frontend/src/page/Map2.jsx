import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import customMarkerImage from "../assets/marker2.png";
import { getAllUsersRoute } from "../Utils/APIRoutes";
const API_Key = import.meta.env.VITE_APP_TOMTOM_APIKEY;
import axios from 'axios'
import CameraModal from "../components/CameraModal/CameraModal";


const axiosX = axios.create({ baseURL: 'http://localhost:8000' });

// console.log(API_Key);
const Map2 = () => {
  const zoomLevel = 18;
  const baseVisibility = 200;
  const [currentLoc, setCurrentLoc] = useState(null);
  const mapRef = useRef(null);
  const targetRef = useRef(null);
  const [camlink, setCamlink] = useState(undefined);
  const [user, setUser] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const {data} = await axiosX.get('/getUserDetails');
        const data2 = await data.userDetails; 
        return data2;
    };
    fetchData().then(data => setUser(data));
  },[]);

  useEffect(()=> {
    console.log(user);
    if(user[0]) {
      user.map((data) => {
        const dat1 = {
          name: data.user.firstname,
          phone: data.user.phoneno,
          cameraId: data.camera.cameraSerialNo,
          angle: data.camera.cameraAngle,
          lat: data.camera.cameraLatitude,
          lng: data.camera.cameraLongitude,
          camLink: data.user.userCameraLink,
        };
        setUserDetails((prev) => [...prev, dat1]);
      })
    }
  }, [user]);

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

  // const addCamera = (lat, lng) => {
  //   setCamLoc((prev) => [...prev, [lng, lat]]);
  // };

  const addMarker = useCallback((e) => {
    const lngLat = e.lngLat;
    console.log(lngLat);
    addCamera(lngLat.lat, lngLat.lng);
  }, []);

  const createCustomMarkerElement = useCallback(() => {
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
  },[map]);

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

  const onViewCCTVClick = (link)=> {
    // if(!link) return;
    if(camlink !== link) 
    if(camlink) setCamlink(null);
    if(!link) return;
    console.log(link);
    setCamlink(link);
      
  }

  const createCard = useCallback((user) => {
    const card = document.createElement("div");
    card.className = "marker";
    card.style.border = "2px solid green";
    card.style.borderRadius = "10px";
    card.style.width = "200px";
    card.style.height = "150px";
    card.style.backgroundSize = "cover";
    card.style.position = "relative";
    card.style.display= "flex";
    card.style.justifyContent= "center"
    // card.style.textAlign = "center"

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

    viewCCTVButton.addEventListener("click", ()=>onViewCCTVClick(user.camLink));

    infoDiv.appendChild(nameField);
    infoDiv.appendChild(phoneField);
    infoDiv.appendChild(cameraIdField);
    infoDiv.appendChild(viewCCTVButton);
    card.appendChild(infoDiv);
    return card;
  }, [])

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
  }, [map, addMarker, popupOffsets, userDetails, createCard, createCustomMarkerElement]);


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
  };

  const makeMarkers = (user, numClosest, col) => {
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
          clickTolerance: "0",
        })
          .setLngLat(loc)
          .addTo(map);

        const marker = new tt.Marker({
          // height: "22",
          // width: "18",
          color: col ? "#13EC88" : "#000",
          clickTolerance: "0",
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
    if(targetRef.current) {
        map && map.off("click", addTarget);
        return;
    }
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
    makeMarkers(locations, 1, true); //previous code
    // makeMarkers(userDetails, 6); // new code

    map && map.off("click", addTarget);
  };

  const getCoordinates = () => {
    map && map.on("click", addTarget);
  };

  const closeModal = () => {
    setCamlink(undefined);
  }

  const reset = () => {
    clear();
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.getElement())
    );
    makeMarkers(userDetails, markers.length - 1, false);
    targetRef.current && targetRef.current.remove();
    targetRef.current = undefined;
  };

  return (
    <div
      className="map_container"
      style={{
        backgroundColor: "#DCF2F1",
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
      {camlink ? <CameraModal camLink={camlink} closeModal={closeModal}/> : <></>}
    </div>
  );
};

export default Map2;
