function instant_execute() {
    //99 Downloads
    chrome.storage.sync.get(['links'], function (result) {
        if (result.links.length === 99) {
        download.downloadCSV();
        }
    });
}

module.exports = {
    instant_execute
}