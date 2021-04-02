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

// DOM Check

if(document.getElementById('ed_tag') !== null) {
  // console.log(document.getElementById('t').innerHTML) // To get innerHTML
  // var inn = document.getElementById('t').innerHTML
  var tag = document.createElement("p");
  // var text = document.createTextNode("Testing of Boost Extension");
  // tag.appendChild(text);
  tag.style.color = 'red';
  var element = document.getElementById("ed_tag");

  element.innerHTML = `
    <h2 class="ed_h2" style="color: rgb(255, 190, 13)">I'm here to help you...<br><span style="color: rgba(9, 9, 97, 0.938)">Are you looking for something</span><h2>
  `
  element.appendChild(tag);
  var frame = document.createElement('div')

  element.appendChild(frame).innerHTML = '<iframe width="500" height="315" src="https://www.youtube.com/embed/8NhiWb7eaBg?autoplay=1&mute=1"></iframe>';
}