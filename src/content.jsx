import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jquery/dist/jquery.min.js';





console.log('hellooooo');
let video = document.querySelector("#movie_player > div.html5-video-container > video");
let iter = 0;


video.addEventListener('canplay', function load() {
    //let videoID = await getID();

    //console.log(videoID);
    let responseDataPromise = getID().then(videoID => {
        getData(videoID)
        .then((resp) => {
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
                console.log(videoYites);
            return(videoYites);
        })
        .then((videoYites) => {
                return addDivBeforeDescription().then((container) => {return [videoYites, container]});
        })
        .then(([videoYites, container]) => {
            console.log("just before render. " + videoID, container, videoYites)
            ReactDOM.render(
                <App videoCitations={videoYites} videoID={videoID}/>,
                container,);
        });
    });
});

// video.addEventListener('canplay', function load() {
//     console.log(video.readyState);
//     let videoID = document.querySelector("#watch7-content > meta:nth-child(6)").content;
    
//     let p = getID().then((result) => {
//         videoID = result;
//         console.log(videoID);
//         let responseDataPromise = getData(videoID)
//         .then(resp => {
//             let videoYites = new Map();
//             console.log(resp);
//                 for (let i = 0; i < resp.length; i++) {
//                     let currCitation = JSON.parse(resp[i]);
//                     let currStart = currCitation["startTime"];
//                     if(!videoYites.has(currStart)) {
//                         videoYites.set(currStart, []);
//                     }
//                     videoYites.get(currStart).push(currCitation);
//                 }
//             return(videoYites);
//         })
//         .then((videoYites) => {
//             return addDivBeforeDescription().then((container) => {return [videoYites, container]});
//         })
//         .then(([videoYites, container]) => {
//             ReactDOM.render(
//             <App videoCitations={videoYites} videoID={videoID}/>,
//             container, //document.getElementById('citation-box')
//             )
//         })
//         .catch(err => console.log(err));
//     });
//     video.removeEventListener('loadeddata', load);
//     video.removeEventListener('canplay', load);
// })

const baseUrl = "https://youtubeextdata.azurewebsites.net/";
const getUrl = baseUrl + "getCitations?videoID=";

async function addDivBeforeDescription () {
    let div = document.createElement("div");
    div.id = "citation-box";
    // <div id="citation-box"></div>;
    //let contents = document.getElementById("meta-contents");
    await loadMetacontents(500);

    let container = document.getElementsByClassName("style-scope ytd-video-secondary-info-renderer")[0];
    console.log(container);

    if (container.children[0] !== null) {
        if (container.children[0].id === "citation-box") {
            return div;
        }
        container.insertBefore(div, container.children[0]);
    }

    return div;

    // await loadMetacontents(contents, 500);


    // if (contents !== null) {
    //     let container = contents.getElementsByClassName("style-scope ytd-watch-flexy")[0];
    //     while (container === null || container === undefined) {
    //         container = await loadHTML(contents, container, 700);
    //     }
    //     contents = container.getElementsByClassName("style-scope ytd-video-secondary-info-renderer");
    //     container = contents[0];
    //     if (container.children[0] !== null) {
    //         if (container.children[0].id === "citation-box") {
    //             return div;
    //         }
    //         container.insertBefore(div, container.children[0]);
    //     }
    // }
}

function loadID(ms) {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            let id = document.querySelector("#page-manager > ytd-watch-flexy");
            if (id) {
                clearInterval(interval);
                resolve(id);
            }
        }, ms);
    });
}

async function getID() {
    const id = await loadID(100);
    console.log("get ID vid ID: " + id.getAttribute('video-id'));
    return id.getAttribute('video-id');
}



function loadMetacontents(ms) {
  return new Promise((resolve) => {
      let interval = setInterval(() => {
          const contents = document.getElementById("meta-contents");
          console.log(contents);
          if (contents) {
              resolve(contents);
              clearInterval(interval);
          }
      }, ms);
  });
}

function loadHTML(contents, container, ms) {
  return new Promise((resolve) => {
      let interval = setInterval(() => {
          container = contents.getElementsByClassName("style-scope ytd-watch-flexy")[0];
          if (container) {
              resolve(container);
              clearInterval(interval);
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
    return fetch(requestUrl)
    .then(response => response.json())
    .then(data => {console.log(data); return data;})
    .catch(err => console.log(err));
}