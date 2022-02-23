import React, { useState } from "react";
import { Chrono } from "react-chrono"; // yarn add react-chrono // npm i react-chrono

function Timeline(props) {
  const getOrderedCitationsArray = Array.from(
    props.videoCitations.values()
  ).flat();
  const data = getOrderedCitationsArray.map((c) => ({
    title: c.title,
    cardTitle: c.title,
    cardSubtitle: c.source,
    url: c.link,
  }));

  const time = getOrderedCitationsArray.map((c) =>
    convertTimeToSeconds(c.startTime)
  );

  // CONVERT TIME TO SECONDS
  function convertTimeToSeconds(time) {
    var p = time.split(":"),
      s = 0,
      m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  }

  const [currentItemIndex, setItemIndex] = useState(0);

  let video = document.querySelector("video");

  video.ontimeupdate = () => {
    const currentTime = Math.floor(video.currentTime);
    console.log("time has updated " + currentTime);
    if (time.includes(currentTime)) {
      setItemIndex(time.indexOf(currentTime));
      console.log(currentItemIndex);
    }
  };

  function jumpToCitation() {
    const timestamps = time.map((timestamp) => (
      <button onClick={jumpTime.bind(this, timestamp)}>
        <p>Jump to Citation {timestamp}</p>
      </button>
    ));
    return timestamps;
  }

  function jumpTime(time) {
    let video = document.getElementsByTagName("video")[0];
    video.currentTime = time;
  }

  return (
    <div style={{ width: "100%", height: "110%", marginBottom: "10px", marginTop: "10px" }}>
      <Chrono
        items={data}
        cardHeight={"100%"}
        cardWidth={"100%"}
        theme={{
          primary: "#ffeeee",
          cardForeColor: "black",
          secondary: "#ff0000",
          titleColor: "white",
          textColor: "white",
          cardBgColor: "#212121"
        }}
        allowDynamicUpdate={true}
        setItemIndex={currentItemIndex}
        disableNavOnKey={true}
        hideControls={true}
      >
        {jumpToCitation()}
      </Chrono>
    </div>
  );
}

export default Timeline;
