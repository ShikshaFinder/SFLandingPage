// components/EmbedVR.js
import React from "react";

const EmbedVR = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="https://immeshers.com/projects/360/RoyalArtCollege/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
        title="VR Experience"
      ></iframe>
    </div>
  );
};

export default EmbedVR;
