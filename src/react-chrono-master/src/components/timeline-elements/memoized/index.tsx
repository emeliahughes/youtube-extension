import { createHistogram } from 'perf_hooks';
import React from 'react';
import { Theme } from '../../../models/Theme';
import {
  TimelineCardTitle,
  TimelineContentSubTitle,
} from '../timeline-card-content/timeline-card-content.styles';

interface Title {
  active?: boolean;
  color?: string;
  dir?: string;
  theme?: Theme;
  title?: string;
  url?: string;
}

interface Content {
  color?: string;
  content?: string;
  dir?: string;
  theme?: Theme;
}

function handleClick(url: any) {
  chrome.storage.local.get(['userID'], function(result) {
    let userClick = JSON.stringify(JSON.stringify(result));
    const response = fetch("https://youtubeextdata.azurewebsites.net/userClick", {
      body: userClick,
      headers: {
          'Content-Type': 'application/json'
      },
      method: "POST"
    })
  });
}

const MemoTitle = React.memo(
  ({ title, url, theme, color, dir, active }: Title) =>
    title && theme ? (
      <TimelineCardTitle
        className={active ? 'active card-title' : 'card-title'}
        theme={theme}
        style={{ color }}
        dir={dir}
      >
        <a href={url} target="_blank" rel="noreferrer" onClick={() => handleClick(url)}>
          {title}
        </a>
      </TimelineCardTitle>
    ) : null,
  () => true,
);

MemoTitle.displayName = 'Timeline Title';

const MemoSubTitle = React.memo<Content>(
  ({ content, color, dir, theme }: Content) =>
    content ? (
      <TimelineContentSubTitle
        style={{ color }}
        dir={dir}
        theme={theme}
        className="card-sub-title"
      >
        {content}
      </TimelineContentSubTitle>
    ) : null,
  () => true,
);

MemoSubTitle.displayName = 'Timeline Content';

export { MemoTitle, MemoSubTitle };
