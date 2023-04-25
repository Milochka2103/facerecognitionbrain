import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";

export const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt>
        <div
          className="Tilt shadow-2"
          style={{ height: 150, width: 150 }}
          options={{ max: 55 }}
        >
          <div className="pa3"><img style={{paddingTop: "5px"}} alt="brain" src={brain} /></div>
        </div>
      </Tilt>
    </div>
  );
};