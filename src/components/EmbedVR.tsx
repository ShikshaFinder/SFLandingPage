// components/EmbedVR.js
import React from "react";

const EmbedVR = ({vrurl}:{vrurl:string}) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={vrurl}
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
