var neo4jInstant = require('./neo4j') // Burst Mode


function instant_execute() {
    //99 Downloads
    chrome.storage.sync.get(['links'], function (result) {
        if (result.links.length === 99) {
        download.downloadCSV();
        }
    });
    neo4jInstant.Neo4jSend(); // Burst Mode
}

module.exports = {
    instant_execute
}