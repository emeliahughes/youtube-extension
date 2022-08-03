"use strict";
import React, { useState } from "react";
import AddCitationViewer from "./AddCitationViewer";
import AddNewCitation from "./newcitation";
import ViewCitations from "./viewCitation";
import Timeline from "./Timeline";

function App(props) {
  //const maxLength = document.getElementsByClassName("ytp-bound-time-right").innerHTML;
  let videoCitations = props.videoCitations;
  let videoID = props.videoID;
  let mainColClasses = "main-col add-citation-inactive";
  let addColClasses = "add-col add-citation-inactive";

  const [showAddCitations, setShowAddCitations] = useState(false);

  const handleAddCitations = (event) => {
    setShowAddCitations(!showAddCitations);
  };

  // Sort each citation by start time
  videoCitations = new Map(
    [...videoCitations.entries()].sort((a, b) => {
      return convertTimeToSeconds(a[0]) - convertTimeToSeconds(b[0]);
    })
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

  if (showAddCitations) {
    mainColClasses = "main-col add-citation-active";
    addColClasses = "add-col add-citation-active";
  } else {
    mainColClasses = "main-col add-citation-inactive";
    addColClasses = "add-col add-citation-inactive";
  }

  return (
    <div className="citation-box">
      <div className="header">
        <h1>Citations</h1>
        <AddCitationViewer
          color={showAddCitations ? "red" : "green"}
          text={showAddCitations ? "Cancel" : "Add New Citation"}
          onClick={handleAddCitations}
        />
      </div>
      <div className="main-view-box">
        <Timeline videoCitations={videoCitations} />
        {/* <div className={mainColClasses}>
          <ViewCitations videoCitations={videoCitations} />
        </div> */}
        <div className={addColClasses}>
          <AddNewCitation videoCitations={videoCitations} videoID={videoID} />
        </div>
      </div>
    </div>
  );
}

export default App;
