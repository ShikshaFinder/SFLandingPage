import React, { useState } from "react";
import Styles from "../styles/popup.module.css";

const YourComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? "blur" : ""}>
      <button onClick={handleOpen}>Open Popup</button>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={handleClose}>Close Popup</button>
            <h2>This is a popup!</h2>
            {/* Add your popup content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
