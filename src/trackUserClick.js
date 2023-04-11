import getUserID from "./getUserId";

async function trackUserClick(click_type, title, citation_id) {
    let userID = await getUserID();
    let userClick = JSON.stringify(`{"userID": "${userID}", "clickType": "${click_type}", "title": "${title}", "citationId": "${citation_id}"}`);
    const response = fetch(`https://youtubeextdata.azurewebsites.net/userClick/${click_type}`, {
        body: userClick,
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    })
}

export default trackUserClick;