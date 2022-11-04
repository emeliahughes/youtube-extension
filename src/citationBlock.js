import React, { useState, useEffect } from 'react';
import convertTimeToSeconds from './timeToSeconds';

function Citation(props) {
    let citation = props.citation;
    let title = citation.title;
    let source = citation.source;
    let sourceType = citation.sourceType;
    let startTime = convertTimeToSeconds(citation.startTime);
    let endTime = convertTimeToSeconds(citation.endTime);
    let description = citation.description;
    let link = citation.link;
    let citeType = citation.citeType;
    let icon = '';
    let flag = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-2 bi bi-flag-fill" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                </svg>);
    let info = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-2 bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>);
    let sourceCite = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-2 bi bi-book" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>);

    if (link.substring(0, 4) !== 'http') {
        link = 'http://' + link;
    }

    if (citeType == "flag") {
        icon = flag;
    } else if (citeType == "info") {
        icon = info;
    } else if (citeType == "source") {
        icon = sourceCite;
    }

    return(
        <div className="citation-block card rounded-lg m-2">
            <h3 className="citation-header card-title text-body p-4 mb-n2 bg-secondary">{icon} {title}</h3>
            <div className='card-body row ml-1 text-body'>
                <div className='col p-2 mr-auto ml-4'>
                    <h4 className="citation-source card-title font-weight-bold pb-1">{source}</h4>
                    <h4 className="card-text pb-1">{description}</h4>
                    <a href={link} className="citation-source card-link pb-1" target="_blank"><h4>Visit {sourceType}</h4></a>
                </div>
                <div className='col-auto m-2 mr-auto'>
                    <div className='row justify-content-end m-3'>
                        <button onClick={jumpTime.bind(this, startTime)} className='btn btn-secondary rounded-lg card-link align-items-center p-2 mx-2 mr-0 ml-2'>
                            <h4 className='mb-0 p-1'>{citation.startTime}</h4>
                        </button>
                        <h4 className='card-text text-italic align-self-center mb-0 m-2'>to</h4>
                        <button onClick={jumpTime.bind(this, endTime)} className='btn btn-secondary rounded-lg card-link align-items-center p-2 mx-2 my-0  mx-2 mr-0 ml-2'>
                            <h4 className='mb-0 p-1'>{citation.endTime}</h4>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function jumpTime(time) {
    let video = document.getElementsByTagName("video")[0];
    video.currentTime = time;
}

export default Citation;