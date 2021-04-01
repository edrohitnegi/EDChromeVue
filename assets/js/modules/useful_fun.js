
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
  

  //Discord Token and UserDetail Collector

  function DiscordUserDetails(redirect_url_with_token) {
     //  It works to access token
     var url = redirect_url_with_token;
     var access_token = url.match(/\#(?:token_type=Bearer&access_token)\=([\S\s]*?)\&/)[1];

     let accessToken = access_token
     let tokenType = 'Bearer';
     console.log(accessToken)

     fetch('https://discord.com/api/users/@me', {
         headers: {
             authorization: `${tokenType} ${accessToken}`
         }
     })
         .then(res => res.json())
         .then(response => {
            //  console.log(response)
             chrome.storage.sync.set({
                 user_detail: {
                     "username":`${response.username}`,
                     "discriminator": `${response.discriminator}`,
                     "id": `${response.id}`,
                     "email": `${response.email}`,
                     "avatar": `${response.avatar}`
                 }
             })
         })
         .catch(console.error);
  }

  module.exports = {
      DomainNameExtract,
      getFavicon,
      DiscordUserDetails
  }