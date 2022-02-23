import React, { useState } from "react";
import { Chrono } from "react-chrono"; // yarn add react-chrono // npm i react-chrono

function Timeline(props) {
  const data = props.data;
  const time = props.time;

  const [currentItemIndex, setItemIndex] = useState(1);

  let video = document.querySelector("video");

  video.ontimeupdate = () => {
    console.log("time has updated");
    const currentTime = Math.floor(video.currentTime);
    if (time.includes(currentTime)) {
      setItemIndex(time.indexOf(currentTime));
      console.log(currentItemIndex);
    }
  };

  function jumpToCitation() {
    const timestamps = time.map((timestamp) => (
      <button onClick={jumpTime.bind(this, timestamp)}>
        <p>Jump to Citation</p>
      </button>
    ));
    return timestamps;
  }
  function jumpTime(time) {
    let video = document.getElementsByTagName("video")[0];
    video.currentTime = time;
  }

  return (
    <div style={{ width: "100%", height: "100%", marginBottom: "10px" }}>
      <Chrono
        items={data}
        mode="HORIZONTAL"
        cardHeight={"100px"}
        cardWidth={"100%"}
        theme={{
          primary: "#FF0000",
          secondary: "black",
        }}
        disableNavOnKey={true}
        hideControls={true}
      >
        {jumpToCitation()}
      </Chrono>
    </div>
  );
}

export default Timeline;
