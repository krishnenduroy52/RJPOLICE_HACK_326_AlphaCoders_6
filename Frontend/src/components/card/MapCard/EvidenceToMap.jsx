import React, { useEffect, useRef, useState } from 'react'
import style from "./EvidenceToMap.module.css";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
const API_Key = import.meta.env.VITE_APP_TOMTOM_APIKEY;

import { getUserDetailsRoute } from '../../../Utils/APIRoutes';

const EvidenceToMap = ({ coordinates, userID }) => {
    const [user, setUser] = useState(null);
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    useEffect(() => {
        if (!coordinates) return;
        const map = tt.map({
            key: API_Key,
            container: mapRef.current,
            center: [coordinates.longitude, coordinates.latitude],
            zoom: 15,
        });
        setMap(map);
        const marker = new tt.Marker().setLngLat([coordinates.longitude, coordinates.latitude]).addTo(map);
        return () => map && map.remove();
    }, [coordinates])

    useEffect(() => {
        if (!userID) return;
        try {
            const fetchUserDetails = async () => {
                const response = await fetch(getUserDetailsRoute(userID));
                const data = await response.json();
                setUser(data.userDetails);
            }
            fetchUserDetails();
        } catch (error) {
            console.log(error);
        }
    }, [userID])
    return (
        <>
            <div className={style.mapContainer}>
                <div className={style.detailsContainer}>
                    <div className="location-details flex items-center flex-col justify-center">
                        <h1 className="text-center text-xl font-bold">Location Details</h1>
                        <span>Latitude: {coordinates.latitude}</span>
                        <span>Longitude: {coordinates.longitude}</span></div>
                    <div className="users-details flex items-center flex-col justify-center">
                        <h1 className="text-center text-xl font-bold">User Details</h1>
                        {user ? ( <>
                            <span>Username: {user.user.firstname} {user.user.lastname}</span>
                            <span>Phone: {user.user.phoneno}</span>
                            <span>Email: {user.user.email}</span>
                        </> 
                        ) : (
                            <span>Loading User Details...</span>
                        )}
                    </div>
                </div>
                <div
                    style={{ height: "350px", width: "550px", borderRadius: "10px", border: "1px solid black" }}
                    ref={mapRef}
                ></div>
                {map ? null : (<><span>Loading Map...</span></>)}
            </div >

        </>
    )
}

export default EvidenceToMap