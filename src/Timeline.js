import { n } from "caniuse-lite/dist/lib/supported";
import React, { useState } from "react";
import { Chrono } from "./react-chrono-master/dist/react-chrono"; // yarn add react-chrono // npm i react-chrono
// import { Chrono } from "react-chrono";

function Timeline(props) {
  const circleDimension = 16;

  let video = document.querySelector("video");

  const orderedCitationsArray = Array.from(
    props.videoCitations.values()
  ).flat();
  var data_0 = orderedCitationsArray.map((c) => ({
    title: c.title,
    cardTitle: c.title,
    cardSubtitle: c.source,
    url: c.link,
    startTime: convertTimeToSeconds(c.startTime) / video.duration * getTimelineWidth() + (circleDimension / 2)
  }));

  function diff(data) {
    return data.slice(1).map((n, i) => ({ ...n, startTime: Math.floor(n.startTime - data[i].startTime) }));
  }

  var data = diff(data_0)
  data.splice(0, 0, data_0[0])
  console.log(data)

  /**
   * Orders the citations for the current video by its start time
   */
  const time = orderedCitationsArray.map((c) =>
    convertTimeToSeconds(c.startTime)
  );

  /**
   * Converts YouTube video time (HH:MM:SS) into seconds
   */
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

  /**
   * Event listener tracks the current timestamp of the video
   */
  video.ontimeupdate = () => {
    const currentTime = Math.floor(video.currentTime);
    console.log("time has updated " + currentTime);
    if (time.includes(currentTime)) {
      var lis = document
        .getElementById("timeline-main-wrapper")
        .getElementsByTagName("li");
      lis[time.indexOf(currentTime)]
        .getElementsByClassName(
          "timeline-circle horizontal in-active css-1bz88me-Circle e5foh872"
        )[0]
        .click();
    }
  };

  /**
   * Maps each of the citations' timestamps to a clickable button tag that allows the client to jump to the specified
   * time in seconds in the video.
   *
   * @returns An array of button tags allowing the user to jump to the specified timestamp.
   *          Timestamp is in seconds
   */
  function jumpToCitation() {
    const timestamps = time.map((timestamp) => (
      <button onClick={jumpTime.bind(this, timestamp)}>
        <p>Jump to Citation {timestamp}</p>
      </button>
    ));
    return timestamps;
  }

  /**
   * Jumps to the given timestamp in the video
   *
   * @param {string} time - The timestamp of the video
   */
  function jumpTime(time) {
    let video = document.getElementsByTagName("video")[0];
    video.currentTime = time;
  }

  /**
   * Gets the the width of the timeline bar in the YouTube video so our timeline could match the width
   *
   * @returns width of the YouTube timeline bar
   */
  function getTimelineWidth() {
    let width = document.querySelector(
      ".ytp-timed-markers-container"
    ).clientWidth;
    console.log(width);
    return width;
  }

  /**
   * @returns the width of each item such that our timeline matches the width of the video timeline
   */
  function getItemWidth() {
    return getTimelineWidth() / orderedCitationsArray.length;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "110%",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <Chrono
        items={data}
        itemWidth={getItemWidth()}
        timelineCircleDimension={circleDimension}
        theme={{
          primary: "#ffeeee",
          cardForeColor: "black",
          secondary: "#ff0000",
          titleColor: "white",
          textColor: "white",
          cardBgColor: "#212121",
        }}
        disableNavOnKey={true}
        hideControls={true}
        mode={"HORIZONTAL"}
      >
        {jumpToCitation()}
      </Chrono>
    </div>
  );
}

export default Timeline;
