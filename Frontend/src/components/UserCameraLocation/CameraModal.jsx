import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "./CameraModal.css";

import customMarkerImage from "./marker2.png"; // Replace with the actual path
import rightArrowImage from "../../assets/right-arrow.png";
import leftArrowImage from "../../assets/left-arrow.png";

const API_Key = import.meta.env.VITE_APP_TOMTOM_APIKEY;

const CameraModal = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const targetRef = useRef(null);
  const [val, setVal] = useState(0);
  const rotationRef = useRef(360);
  const defaultMarkerRef = useRef(null);
  const zoomLevel = 18;
  const baseVisibility = 200;

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
        zoom: zoomLevel,
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

    const marker = new tt.Marker({
      clickTolerance: "20",
      height: "22",
      width: "18",
    })
      .setLngLat(e.lngLat)
      .addTo(map);
    targetRef.current = customMarker;
    defaultMarkerRef.current = marker;

    map && map.off("click", addTarget);
  };
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

    return markerElement;
  };

  const rotateMarkerClockwise = () => {
    if (targetRef.current) {
      rotationRef.current = (rotationRef.current + 30) % 360;
      console.log(rotationRef.current);
      targetRef.current.setRotation(rotationRef.current);
    }
  };

  const rotateMarkerAnticlockwise = () => {
    if (targetRef.current) {
      rotationRef.current = (rotationRef.current - 30) % 360;
      console.log(rotationRef.current);
      targetRef.current.setRotation(rotationRef.current);
    }
  };

  const removeMarker = () => {
    setVal(0);
    if (targetRef.current) {
      defaultMarkerRef.current.remove();
      targetRef.current.remove();
      defaultMarkerRef.current = null;
      targetRef.current = null;
      rotationRef.current = null;
    }
  };

  useEffect(() => {
    const handleZoomChange = () => {
      const currentZoom = map.getZoom();
      const baseSize = baseVisibility;

      if (targetRef.current) {
        const newSize = baseSize * (1 / 2 ** (zoomLevel - currentZoom));
        targetRef.current.getElement().style.width = `${Math.max(
          newSize,
          0.00000000001
        )}px`;
        targetRef.current.getElement().style.height = `${Math.max(
          newSize,
          0.00000000001
        )}px`;
      }
    };

    if (map) {
      // Listen for zoom events
      map.on("zoom", handleZoomChange);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (map) {
        map.off("zoom", handleZoomChange);
      }
    };
  }, [map]);

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
        {map ? (
          <>
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
                {/* Rotate left */}
                <img
                  src={leftArrowImage}
                  alt="left rotate"
                  height={20}
                  width={20}
                  className="arrows"
                />
              </button>
              <button
                type="button"
                className="location_btns"
                onClick={rotateMarkerClockwise}
              >
                <img
                  src={rightArrowImage}
                  height={20}
                  width={20}
                  className="arrows"
                  alt="right rotate"
                />
              </button>
              <button
                type="button"
                className="location_btns"
                onClick={removeMarker}
              >
                Remove Location
              </button>
            </div>
          </>
        ) : (
          <>
            <span>Loading Map...</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraModal;
