import React from "react";
import { Chrono } from "react-chrono";  // yarn add react-chrono
                                        // npm i react-chrono
import data from "./data";


export const Timeline = () => {

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Chrono items={data} mode="HORIZONTAL"/>
    </div>
  );
};

export default Timeline;
