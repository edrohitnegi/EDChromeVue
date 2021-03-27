
var json_transform = require('./json_transform')
var moment = require('moment')
var current_time =  moment().format('LLL');

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                          //DISCORD TASK//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for Discord WebHook
function DiscordSend() {
    const whurl = 'https://discord.com/api/webhooks/824505278002888724/PZQ6rS-PY1yHPNl0CCateeHe6nQY4_97oAeYmfyRCrjyatDNGCHgiz0bA7G5OUVdVscA';
    
    //Use this for JSON Send
    const jmsg = {
      "content": "`" + `${JSON.stringify(json_transform.JSONTransform)}` +"`",
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

    // To connect with zelda bolt
    const zelda_msg = {
      "content":`!link ${document.title} ${window.location.href}`,
      "username":`Prashant`,
      "avatar_url": `https://i1.wp.com/www.edvanta.com/wp-content/uploads/2017/05/favicon.png?fit=32%2C31&ssl=1`
    }
  
    fetch(
      whurl,
      {
        "method": "post",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify(zelda_msg).toString()
      }
    )
  }




////////////////////////////////////////////  DISCROD END  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    DiscordSend
}