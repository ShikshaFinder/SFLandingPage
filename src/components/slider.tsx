import React, { useState } from "react";

const Slider = ({ images,imageUrl }:{images:any,imageUrl:string}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentIndex];

  return (
    <div className="slider">
      <img src={currentImage.imageUrl} alt="Slider Image" />
      <div className="arrows">
        <button onClick={handleLeftArrowClick}>&lt;</button>
        <button onClick={handleRightArrowClick}>&gt;</button>
      </div>
    </div>
  );
};

export default Slider;
