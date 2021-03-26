var JsonObjectData = {}


function JSONTransform() {
    chrome.storage.sync.get(['links'], function (result){
        var discord_json = result.links;
        var jsonTitle = []
        var JsonLinks = []
        // var JsonObjectData = {}
        discord_json.forEach(function (rowArray) {
          //csv code
          // var row = rowArray.join(",");
          // csvContent += row + "\r\n";
          //json code 
          var id = discord_json.indexOf(rowArray)
    
          var title_data = {
            "id": id,
            "title": rowArray[0]
          }
    
          var link_data = {
            "id": id,
            "timestamps":rowArray[2],
            "link": rowArray[1]
          }
    
          jsonTitle.push(title_data)
          JsonLinks.push(link_data)
        });
        JsonObjectData["node"] = jsonTitle;
        JsonObjectData["links"] = JsonLinks;
        return JsonObjectData
      })
}


  module.exports = {
      JSONTransform
  }