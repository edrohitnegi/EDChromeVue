var axios = require('axios');
let user_signed_in = false;
const DISCORD_URI = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('822766443367235616');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent(chrome.identity.getRedirectURL()); //https://chromeext_id.chromiup.app/ something


const STATE = encodeURIComponent('edlink');
const SCOPE = encodeURIComponent('identify email');
console.log(chrome.identity.getRedirectURL())
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ links: [] });
    // console.log('ON Installed')
});


function get_discord_uri() {
    const nonce = encodeURIComponent(Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15))
    const url = `${DISCORD_URI}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&nonce=${nonce}`

    console.log(url);
    return url;
}
// console.log(get_discord_uri())


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'login') {
        chrome.identity.launchWebAuthFlow({
            url: get_discord_uri(),
            interactive: true
        }, function(redirect_uri) {
            if (chrome.runtime.lastError || redirect_uri.includes('access_denied')) {
                console.log("Could not authenticate.");
                sendResponse('fail');
                console.log(redirect_uri)
            } else {
                user_signed_in = true;
                console.log(redirect_uri)
                   

                //  It works to access token
                var url = redirect_uri;
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
                        console.log(response)
                        chrome.storage.sync.set({
                            user_detail: {
                                "username":`${response.username}`,
                                "discriminator": `${response.discriminator}`,
                                "id": `${response.id}`,
                                "email": `${response.email}`
                            }
                        })
                    })
                    .catch(console.error);

                sendResponse('success');  // Error: It's not working
            }
        })
        // sendResponse('success'); 
        user_signed_in = true
    } else if (request.message === 'logout') {
        user_signed_in = false
        return false;
    }
})



// // Important Detail

// let acessToken = 'ads';
// let toknType = 'Bearer';

// fetch('https://discord.com/api/users/@me', {
//     headers: {
//         authorization: `${toknType} ${acessToken}`
//     }
// })
//     .then(res => res.json())
//     .then(response => {
//         console.log(response)
        
//     })
//     .catch(console.error);


// //  It works to access token
// var url = 'https://hjhfbbapcjpoodjfclmpmgildhjofanp.chromiumapp.org/#token_type=Bearer&access_token=asd&expires_in=604800&scope=identify+email&state=edlink';
// var access_token = url.match(/\#(?:token_type=Bearer&access_token)\=([\S\s]*?)\&/)[1];

// console.log(access_token)