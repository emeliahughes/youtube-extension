import React from "react";
import { Chrono } from "react-chrono";  // yarn add react-chrono
                                        // npm i react-chrono


export const Timeline = () => {

  const data = [
    {
      title: "May 1940",
      contentTitle: "Dunkirk",
      contentText:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      contentDetailedText: `On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.
        To save the BEF, an evacuation by sea was organised under the direction of Admiral Bertram Ramsay. Over nine days, warships of the Royal and French navies together with civilian craft, including the “little ships” made famous in a BBC broadcast by JB Priestley, successfully evacuated more than 338,000 British and Allied troops from the beaches of Dunkirk, in the remarkable Operation Dynamo. Churchill called it a “miracle of deliverance”, but warned, “Wars are not won by evacuations.”`,
    }
  ];

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Chrono items={data} mode="HORIZONTAL" />
    </div>
  );
};

export default Timeline;
