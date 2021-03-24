"use strict";

// import neo4j from 'neo4j-driver';
// Adding link into array on each visit
chrome.storage.sync.get(['links'], function (result) {
  var url = window.location.href;
  var link_detail = [document.title, url];
  var excludes_link = ["https://www.google.com/", "https://www.instagram.com/", "https://www.twitter.com/", "https://www.discord.com/"];

  if (!result.links.includes(link_detail) && !excludes_link.includes(link_detail)) {
    // If links already available in array then it will not push this url
    result.links.push(link_detail);
  } // result.links.push(url)


  chrome.storage.sync.set({
    links: result.links
  });
  console.log(result.links);
}); //Download CSV Function

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
} // It will download csv when links reach upto 99

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

//--------------------------------------------
//Experimental

function downloadJSON() {
  var name_of_file = prompt("Enter The Name Of Your JSON");
  chrome.storage.sync.get(['links'], function (result) {
    console.log('long');
    var custom_csv = result.links;
    var jsonTitle = []
    var JsonLinks = []
    var JsonObjectData = {}
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


// End Experiment

chrome.storage.sync.get(['links'], function (result) {
  if (result.links.length === 99) {
    downloadCSV();
  }
}); // Shorcut Key definition

document.addEventListener('keydown', function (e) {
  // To download in csv format
  if (e.key === "d" && e.altKey) {
    downloadCSV();
  }

  if (e.key === "l" && e.altKey) {
    downloadJSON();
  }

  if (e.key === "f" && e.altKey) {
    window.open('https://www.facebook.com', '_blank');
  }

  if (e.key === "t" && e.altKey) {
    window.open('https://www.twitter.com', '_blank');
  }

  if (e.key === "i" && e.altKey) {
    window.open('https://www.instagram.com', '_blank');
  }

  if (e.key === "g" && e.altKey) {
    window.open('https://www.google.com', '_blank');
  }

  if (e.key === "n" && e.altKey) {
    window.open('https://www.edvanta.com', '_blank');
  }
});
console.log('%c PK Karn!!', 'font-weight: bold; font-size: 30px;color: white; text-shadow: 2px 2px 0 rgb(217,31,38)'); // const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'edvanta'))
// console.log(driver)
// const link = window.location.href;
// // var name = prompt('Enter the Name:');
// var session = driver.session();
// session.run('CREATE (n:Link {link: $link})', {link: `${link}`});
// // console.log(session)
// console.log('Data Entered Successfully');
// var actualCode = <script src="https://cdn.jsdelivr.net/npm/neo4j-driver"></script>
// var script = document.createElement("script")
// script.src = "https://cdn.jsdelivr.net/npm/neo4j-driver"
// var body = document.body;
// body.appendChild(script);
// // body.appendChild(script2);
// console.log(body)
// script.textContent = actualCode;
// script.appendChild(actualCode);

// var driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'edvanta'));
// console.log(driver);




console.log('pkkarn');

var neo4j = require('neo4j-driver')

var driver = neo4j.driver(
    'bolt://localhost:7687',
     neo4j.auth.basic('neo4j', 'edvanta')

        // 'neo4j://178.79.165.212:7687',
        // neo4j.auth.basic('neo4j', 'Edvanta#21$')
)
console.log('Driver', driver)
console.log('Session', driver.session())

function insertData() {
    // var link = prompt("Enter name: ")
    // var link = prompt('Insert Data')
    // const link = window.location.href;
    // var name = prompt('Enter the Name:');
    var session = driver.session();
    // var transaction = session.begin()

    // USE db_name + query to switch between database
    
    session.run('CREATE (n:Game {name: "RockstarGames"})');
    // console.log(session)
    console.log('Data Entered Successfully');

    // fetch('http://localhost:7474/browser/', {
    //     method: 'GET',
    //     headers: {
    //     // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //     // "Accept": "application/json"
    //     "Accept": "application/json"
    //     },
    // }).then(res=> {
    //     console.log(res)
    // })
}
document.addEventListener('keydown', function(e) {
    if((e.key === "d") && e.altKey) {
        insertData();
    }
})

console.log(driver)

