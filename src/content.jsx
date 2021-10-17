import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './content.css';
import { render } from 'react-dom'



console.log('hellooooo');
// const app = document.createElement('div');
// app.id = 'root';
// document.body.append(app);

addDivBeforeDescription().then(container => {
    ReactDOM.render(
      <App />,
      container,//document.getElementById('citation-box')
    );
})

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
        console.log(container);
        console.log(typeof(container));
        console.log(container.children[0]);
        if (container.children[0] !== null) {
            container.insertBefore(div, container.children[0]);
        } else {
            console.log('yite');
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