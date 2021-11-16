import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './content.css';
import { render } from 'react-dom'; //this isn't used, does it need to be here?
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';



console.log('hellooooo');
// const app = document.createElement('div');
// app.id = 'root';
// document.body.append(app);
const videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;
const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const getUrl = baseUrl + "getCitations?videoID=";

let responseDataPromise = getData(videoID)
    .then(resp => {
        let videoYites = new Map();
        console.log(resp);
            for (let i = 0; i < resp.length; i++) {
                let currCitation = JSON.parse(resp[i]);
                let currStart = currCitation["startTime"];
                if(!videoYites.has(currStart)) {
                    videoYites.set(currStart, []);
                }
                videoYites.get(currStart).push(currCitation);
            }
        return(videoYites);
    })
    .then((videoYites) => {
        return addDivBeforeDescription().then((container) => {return [videoYites, container]});
    })
    .then(([videoYites, container]) => {
        ReactDOM.render(
          <App videoCitations={videoYites} videoID={videoID}/>,
          container, //document.getElementById('citation-box')
        )
    })
    .catch(err => console.log(err));



async function addDivBeforeDescription () {
    let div = document.createElement("div");
    div.id = "citation-box";
    // <div id="citation-box"></div>;
    let contents = document.getElementById("meta-contents");
    await loadMetacontents(contents, 500);
    if (contents !== null) {
        let container = contents.getElementsByClassName("style-scope ytd-watch-flexy")[0];
        while (container === null || container === undefined) {
            container = await loadHTML(contents, container, 700);
        }
        contents = container.getElementsByClassName("style-scope ytd-video-secondary-info-renderer");
        container = contents[0];
        if (container.children[0] !== null) {
            container.insertBefore(div, container.children[0]);
        }
    }

    return div;
}

function loadMetacontents(contents, ms) {
  return new Promise((resolve) => {
      let interval = setInterval(() => {
          contents = document.getElementById("meta-contents");
          console.log(contents);
          if (contents !== null && contents !== undefined) {
              resolve(contents);
              clearInterval(interval);
          } else {
              resolve(loadMetacontents);
          }
      }, ms);
  });
}

function loadHTML(contents, container, ms) {
  return new Promise((resolve) => {
      let interval = setInterval(() => {
          container = contents.getElementsByClassName("style-scope ytd-watch-flexy")[0];
          if (container !== null && container !== undefined) {
              resolve(container);
              clearInterval(interval);
          } else {
              resolve(loadHTML);
          }
      }, ms);
  });
}

/**
 * Makes a GET request to get the data for a particular video.
 * @param {string} videoID unique ID of the video
 * @returns a Promise for all video data
 */
 function getData(videoID) {
    let requestUrl = getUrl + videoID;
    return fetch(requestUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {return response.json();})
    .catch(err => console.log(err));
}