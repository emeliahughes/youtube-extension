const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    const userID = document.getElementById("userID").value;
    console.log(userID);
    chrome.storage.local.set({"userID": userID}, function() {
        console.log('Value is set to ' + userID);
    });
});