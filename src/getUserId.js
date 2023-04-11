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

export default getUserID;