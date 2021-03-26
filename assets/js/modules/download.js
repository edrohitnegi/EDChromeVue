
var JsonObjectData = {}
// Download CSV Function
function downloadCSV() {
    var name_of_file = prompt("Enter The Name Of Your CSV File");
    chrome.storage.sync.get(['links'], function (result) {
      console.log('long');
      var custom_csv = result.links;
      var csvContent = "data:csv/csv;charset=utf-8,";
      custom_csv.forEach(function (rowArray) {
        // csv code
        var row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent); // window.open(encodedUri);   // This will download the data without csv extension
      // uriToJSON(encodedUri)
      
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "".concat(name_of_file, ".csv")); // document.body.appendChild(link); // Required for FF
  
      link.click();
    });
}


//Download JSON format in node links
function downloadJSON() {
    var name_of_file = prompt("Enter The Name Of Your JSON");
    chrome.storage.sync.get(['links'], function (result) {
      console.log('long');
      var custom_csv = result.links;
      var jsonTitle = []
      var JsonLinks = []
      // var JsonObjectData = {}
      custom_csv.forEach(function (rowArray) {
        //csv code
        // var row = rowArray.join(",");
        // csvContent += row + "\r\n";
        //json code 
        var id = custom_csv.indexOf(rowArray)
  
        var title_data = {
          "id": id,
          "title": rowArray[0]
        }
  
        var link_data = {
          "id": id,
          "timestamp": rowArray[2],
          "link": rowArray[1]
        }
  
        jsonTitle.push(title_data)
        JsonLinks.push(link_data)
      });
      JsonObjectData["node"] = jsonTitle;
      JsonObjectData["links"] = JsonLinks;
      
  
      // Download
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JsonObjectData));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", "".concat(name_of_file, ".json")); // document.body.appendChild(link); // Required for FF
      downloadAnchorNode.click()
    });
  } 



//   Title link format

// Working Code
//----------------------------------------------------
// function downloadJSON() {
//   var name_of_file = prompt("Enter The Name Of Your CSV");
//   chrome.storage.sync.get(['links'], function (result) {
//     console.log('long');
//     var custom_csv = result.links;
//     var jsonData = []
//     var JsonObjectData = {}
//     custom_csv.forEach(function (rowArray) {
//       //csv code
//       // var row = rowArray.join(",");
//       // csvContent += row + "\r\n";
//       //json code 
//       var data = {
//         title: rowArray[0],
//         link: rowArray[1]
//       }
//       jsonData.push(data);
//       JsonObjectData['link_data'] = jsonData;
//       console.log(JsonObjectData)
//     });
//     console.log(jsonData)
    

//     // Download
//     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JsonObjectData));
//     var downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute("href",     dataStr);
//     downloadAnchorNode.setAttribute("download", "".concat(name_of_file, ".json")); // document.body.appendChild(link); // Required for FF
//     downloadAnchorNode.click()
//   });
// } 



module.exports = {
    downloadCSV,
    downloadJSON
}