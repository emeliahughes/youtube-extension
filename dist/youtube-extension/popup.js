const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
    const userID = document.getElementById("userID").value;
    console.log(userID);
    chrome.storage.sync.set({"userID": userID}, function() {
        console.log('Value is set to ' + userID);
    });
});

chrome.storage.sync.get('userID', result => {
    if (result) {
      console.log(result['userID']);
      document.getElementsByClassName('current_user')[0].innerHTML = `<div class=user_id_container> <p>Logged in as: <p id=user_id>${result['userID']} <p><p><div>`;
    }
  });