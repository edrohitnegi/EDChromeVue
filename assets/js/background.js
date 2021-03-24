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

// fDgp0IofItLMY6PZ5iOtWkw6748Xv1
// fDgp0IofItLMY6PZ5iOtWkw6748Xv1

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