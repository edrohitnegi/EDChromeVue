"use strict";
// var shortUrl = require('node-url-shortener');
var moment = require('moment')
var axios = require('axios')
var current_time =  moment().format('LLL');
var JsonObjectData = {}

// require('dotenv').config()
// import neo4j from 'neo4j-driver';
// Adding link into array on each visit
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



//Download CSV Function

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

// It will download csv when links reach upto 99

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


// Transforming Data into JSON Object so that we could pass it inside Discord Bot
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
  })


//99 Downloads
chrome.storage.sync.get(['links'], function (result) {
  if (result.links.length === 99) {
    downloadCSV();
  }
}); // Shorcut Key definition

//shorthands
document.addEventListener('keydown', function (e) {
  // To download in csv format
  if (e.key === "d" && e.altKey) {
    // downloadCSV();
    null
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

var neo4j = require('neo4j-driver')

var driver = neo4j.driver(
    'neo4j://localhost:7687',
     neo4j.auth.basic('neo4j', 'edvanta')
)


console.log("dsicor",JsonObjectData)

function insertData() {
    var session = driver.session();
    
    session.run('CREATE (n:Game {name: "RockstarGames"})');
    console.log('Data Entered Successfully');
    // Kaaro
    // fetch('http://localhost:7474/db/neo4j/tx/commit', {
    //     method: 'POST',
    //     headers: {
    //     "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    //     // "Accept": "application/json"
    //     "Authorization": "Basic bmVvNGo6ZWR2YW50YQ=="
    //     },
    //     body: {
    //         "statements" : [ {
    //           "statement" : "MATCH (n) RETURN n"
    //         } ]
    //     }
    // }).then(res=> {
    //     console.log(res)
    // })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                          //DISCORD TASK//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for Discord WebHook
function DiscordSend() {
  const whurl = 'https://discord.com/api/webhooks/824505278002888724/PZQ6rS-PY1yHPNl0CCateeHe6nQY4_97oAeYmfyRCrjyatDNGCHgiz0bA7G5OUVdVscA';
  
  //Use this for JSON Send
  const jmsg = {
    "content": "`" + `${JSON.stringify(JsonObjectData)}` +"`",
    "username":`BOOST!!!`,
    "avatar_url": `https://i1.wp.com/www.edvanta.com/wp-content/uploads/2017/05/favicon.png?fit=32%2C31&ssl=1`
    // {"links":"fogooo.com"} nahi le rha
  }
  
  //Use this for structured Message send
  const msg = {
    "content":`**Title**: ${document.title}\n**URL**: ${window.location.href}\n**DATE**: ${current_time}`,
    "username":`BOOST!!!`,
    "avatar_url": `https://i1.wp.com/www.edvanta.com/wp-content/uploads/2017/05/favicon.png?fit=32%2C31&ssl=1`
  }

  fetch(
    whurl,
    {
      "method": "post",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify(msg).toString()
    }
  )
}

document.addEventListener('keydown', function(e) {
  if((e.key === "d") && e.altKey) {
      DiscordSend();
  }
})

// DiscordSend();


// Favicon Set Avatar Url
var getFavicon = function(){
  var favicon = undefined;
  var nodeList = document.getElementsByTagName("link");
  for (var i = 0; i < nodeList.length; i++)
  {
      if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
      {
          favicon = nodeList[i].getAttribute("href");
      }
  }
  return favicon;        
}


//Getting Image url
if (getFavicon() === undefined) {
  var img = "https://i1.wp.com/www.edvanta.com/wp-content/uploads/2017/05/favicon.png?fit=32%2C31&ssl=1"

} else {
  var img = getFavicon();
}

//Extract Plain from Domain

//Extract domain Name from url
function DomainNameExtract(url) {
  var domain_name = `${url}`.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img).toString()
    .replace('https://www.','').replace('.com','')
    return domain_name;
}

////////////////////////////////////////////  DISCROD END  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


//TO access detail
// chrome.storage.sync.get(['user_detail'],(result) => {
//     console.log(result)
//     console.log(result.user_detail.username)
//     console.log(result.user_detail.discriminator)
//     console.log(result.user_detail.id)
//     console.log(result.user_detail.email)

// })

//avatar testing "8b153ecb09097f9be151386fbcbd7ff0"
