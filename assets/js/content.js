"use strict";
// var shortUrl = require('node-url-shortener');

var axios = require('axios')
var linkstore = require('./modules/linkstore')
var download = require('./modules/download')
var instant = require('./modules/instant')
var short = require('./modules/shorthands')
var any = require('annyang');

//To Store Link
linkstore.LinkStore();

// To execute instant
instant.instant_execute();

// Shorcut Key definition
short.ShortHand();

console.log('%c BOOST!!', 'font-weight: bold; font-size: 30px;color: white; text-shadow: 2px 2px 0 rgb(217,31,38)'); // const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'edvanta'))

chrome.storage.sync.get(['user_detail'], (result) => {
    console.log(result.user_detail)
    console.log(result.user_detail.avatar)
})

// if (any) {
//     // Let's define a command.
//     var commands = {
//       'hello': function() { alert('Hello world!'); }
//     };
   
//     // Add our commands to annyang
//     any.addCommands(commands);
   
//     // Start listening.
//     any.start();
// }