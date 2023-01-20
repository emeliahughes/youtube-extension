async function getUserID() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get('userID', result => {
                if (! (result && result['userID'] && result['userID'] !== "") ) {
                    resolve("EMPTY USER ID");
                } else {
                    resolve(result['userID']);
                }
            });
        } catch (ex) {
            reject(ex);
        }
    })
}

async function trackUserClick(click_type) {
    let userID = await getUserID();
    let userClick = JSON.stringify(`{"userID": "${userID}", "clickType": "${click_type}"}`);
    const response = fetch(`https://youtubeextdata.azurewebsites.net/userClick/${click_type}`, {
    body: userClick,
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST"
    })
}

export default trackUserClick;