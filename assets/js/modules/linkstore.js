var moment = require('moment')
var current_time =  moment().format('LLL');


// It will store your link
function LinkStore() {
    chrome.storage.sync.get(['links'], function (result) {
        var url = window.location.href;
        var link_detail = [document.title, url, current_time];
        var excludes_link = ["https://www.google.com/", "https://www.instagram.com/", "https://www.twitter.com/", "https://www.discord.com/"];
      
        if (!result.links.includes(link_detail) && !excludes_link.includes(link_detail)) {
          // If links already available in array then it will not push this url
          result.links.push(link_detail);
        } // result.links.push(url)
      
      
        chrome.storage.sync.set({
          links: result.links
        });
        console.log(result.links);
      });
}

module.exports =  {
    LinkStore
}