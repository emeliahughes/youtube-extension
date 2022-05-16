import { n } from "caniuse-lite/dist/lib/supported";
import React, { useState } from "react";
import { Chrono } from "./react-chrono-master/dist/react-chrono"; // yarn add react-chrono // npm i react-chrono
// import { Chrono } from "react-chrono";

function Timeline(props) {
  // Dimension of the circles as they appear on the timeline
  const circleDimension = 16;

  // gets the video tag
  let video = document.querySelector("video");

  // Flattens the array allowing us to easily retrieve the start time
  // Before this, the start time were in a nested list
  const orderedCitationsArray = Array.from(
    props.videoCitations.values()
  ).flat();

  // Maps each citation (ordered by start time) into "item" format as required for
  // Chrono, checkout their github page for details of this format!
  // Added a "startTime" field which helps in the placement of the citation on the timeline
  var data_0 = orderedCitationsArray.map((c) => ({
    title: c.title,
    cardTitle: c.title,
    cardSubtitle: c.source,
    url: fixLink(c.link),
    startTime:
      (convertTimeToSeconds(c.startTime) / video.duration) *
        getTimelineWidth() +
      circleDimension / 2,
  }));

  var data = diff(data_0);
  data.splice(0, 0, data_0[0]); // adds the first citation back to the data
  for (let i = 0; i < data.length-1; i++) {
    if (data[i+1].startTime == 0) {
      data[i+1].startTime+=circleDimension/2;
    }
  }

  console.log(data);

  /**
   * Orders the citations for the current video by its start time
   */
  const time = orderedCitationsArray.map((c) =>
    convertTimeToSeconds(c.startTime)
  );

  /**
   * Event listener tracks the current timestamp of the video
   */
  video.ontimeupdate = () => {
    const currentTime = Math.floor(video.currentTime);
    if (time.includes(currentTime)) {
      var lis = document
        .getElementById("timeline-main-wrapper")
        .getElementsByTagName("li");
      lis[time.indexOf(currentTime)]
        .querySelectorAll('[data-testid="timeline-circle"]')[0]
        .click();
    }
  };

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
        itemWidth={getTimelineWidth() / orderedCitationsArray.length}
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
        {getCardElements(orderedCitationsArray, time)}
      </Chrono>
    </div>
  );
}

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

/**
 * Converts seconds to (HH:MM:SS) format or (MM:SS) format if totalSeconds is less than an hour
 *
 * @param {*} totalSeconds
 * @returns (HH:MM:SS) or (MM:SS) formatted time
 */
function convertSecondsToTime(totalSeconds) {
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var time = minutes + ":" + seconds;

  if (hours != 0) {
    return hours + ":" + time;
  }

  return time;
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

function getCardElements(data, time) {
  var elements = []
  for (let i = 0; i < data.length; i++) {
    const url = fixLink(data[i].link);
    elements.push(
      <div>
        {/* <a href={url} target="_blank" rel="noreferrer" onClick={handleClick(url)}>
          <p>Go to Source</p>
        </a> */}
        <button onClick={jumpTime.bind(this, time[i])}>
          <p>Jump to Citation {convertSecondsToTime(time[i])}</p>
        </button>
      </div>
    )
  }
  return elements;
}

function handleClick(url) {
  console.log(url, "clicked");
}


/**
 * Gets the difference in start time between each consecutive citation. Used to determine the spacing
 * between citations in the timeline
 *
 * @param {*} data Data in the format as required for Chrono
 * @returns the data such that the "distance" between citations is calculated
 */
function diff(data) {
  return data
    .slice(1)
    .map((n, i) => ({
      ...n,
      startTime: Math.floor(n.startTime - data[i].startTime),
    }));
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
  return width;
}

function fixLink(link) {
  if (link.substring(0, 5) !== 'http') {
    if (link.substring(0, 4) !== 'http') {
        link = 'http://' + link;
    }
  }
  return link;
}

export default Timeline;
