import React, { useState } from "react";
import exifr from "exifr";

const ImageLocationTracker = () => {
  const [locationData, setLocationData] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const exifData = await exifr.parse(file);
        setLocationData(exifData);
        console.log(exifData);
      } catch (error) {
        console.error("Error extracting EXIF data:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {locationData && (
        <div>
          <h3>Location Information:</h3>
          <p>Latitude: {locationData?.latitude}</p>
          <p>Longitude: {locationData?.longitude}</p>
          {/* Add more location information as needed */}
        </div>
      )}
    </div>
  );
};

export default ImageLocationTracker;
