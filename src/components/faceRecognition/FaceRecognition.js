import React from "react";
import './faceRecognition.css';

const FaceRecognition = ({ url, box }) => {
  if (!url) {
    return null;
  };
  
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id='inputimage' src={url} alt="image" width='500px' height='auto' />
        <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol  }} ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;