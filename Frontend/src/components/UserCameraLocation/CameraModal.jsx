import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "./CameraModal.css";

import customMarkerImage from "./marker.png"; // Replace with the actual path

const API_Key = import.meta.env.VITE_APP_TOMTOM_APIKEY;

const CameraModal = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const targetRef = useRef(null);
  const [val, setVal] = useState(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        () => {
          alert(
            "Unable to retrieve your location. Please enable Geolocation and reload to continue...."
          );
        }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser. We recommend using Chrome Browser."
      );
    }
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    try {
      const mp = tt.map({
        key: API_Key,
        container: mapRef.current,
        center: currentLocation,
        zoom: 18,
      });
      setMap(mp);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
    return () => map && map.remove();
  }, [currentLocation]);

  const getCoordinates = () => {
    setVal(1);
    if (targetRef.current) {
      return;
    }
    map && map.on("click", addTarget);
  };

  const addTarget = (e) => {
    const customMarker = new tt.Marker({
      element: createCustomMarkerElement(),
      anchor: "center",
      rotation: rotationRef.current,
      clickTolerance: "20",
    })
      .setLngLat(e.lngLat)
      .addTo(map);

    targetRef.current = customMarker;

    map && map.off("click", addTarget);
  };

  const createCustomMarkerElement = () => {
    const markerElement = document.createElement("div");
    markerElement.style.backgroundImage = `url(${customMarkerImage})`;
    markerElement.style.width = "100px";
    markerElement.style.height = "100px";
    markerElement.style.backgroundSize = "cover";
    return markerElement;
  };

  const rotateMarkerClockwise = () => {
    if (targetRef.current) {
      rotationRef.current += 15;
      targetRef.current.setRotation(rotationRef.current);
    }
  };

  const rotateMarkerAnticlockwise = () => {
    if (targetRef.current) {
      rotationRef.current -= 15;
      targetRef.current.setRotation(rotationRef.current);
    }
  };

  const removeMarker = () => {
    setVal(0);
    if (targetRef.current) {
      targetRef.current.remove();
      targetRef.current = null;
      rotationRef.current = null;
    }
  };

  return (
    <div className="font-[Poppins]">
      <h1 className="text-center text-xl font-bold">Camera Settings</h1>
      <p className="text-center">
        Indicate the location on the map where your camera is positioned and
        rotate the camera in the same direction it is pointing.
      </p>
      <div className="location-details">
        <h1 className="text-center text-xl font-bold">Location Details</h1>
        <div
          style={{ height: "200px", width: "520px", borderRadius: "10px" }}
          ref={mapRef}
          className="main_map"
        ></div>
        <div className="btns flex justify-around items-center">
          <button
            type="button"
            className={`location_btns ${val == 1 ? "active" : ""}`}
            onClick={getCoordinates}
          >
            Set location
          </button>
          <button
            type="button"
            className="location_btns"
            onClick={rotateMarkerAnticlockwise}
          >
            Rotate left
          </button>
          <button
            type="button"
            className="location_btns"
            onClick={rotateMarkerClockwise}
          >
            Rotate right
          </button>
          <button
            type="button"
            className="location_btns"
            onClick={removeMarker}
          >
            Remove Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
