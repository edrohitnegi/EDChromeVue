
var moment = require('moment')
var current_time =  moment().format('LLL');
var data = {}

function Neo4jSend(){
    chrome.storage.sync.get(['user_detail'],(result) => {
        // console.log(result)
        // console.log(result.user_detail.username)
        // console.log(result.user_detail.discriminator)
        // console.log(result.user_detail.id)
        // console.log(result.user_detail.email)
        
        
        data["username"] = result.user_detail.username
        data["discriminator"] = result.user_detail.discriminator
        data["email"] = result.user_detail.email
        data["title"] = document.title
        data["url"] = window.location.href
        data["time"] = current_time
        console.log(data.username)
    
        //Working Query, Please dont touch 
        const query =  {
            "query": `MERGE (a:User{username: '${data.username}', discriminator: '${data.discriminator}', email: '${data.email}'}) MERGE (b:Link{uri: '${data.url}'}) MERGE (a)-[:VISITED {timestamps: '${data.time}'}]->(b) SET b.message = '${data.title}';`
        }
    
        
        fetch(
            'https://thoughtjumper.edvanta.com/api/v1/query',
            {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(query)
            }
        )
    
        console.log(query)
    })
}




module.exports = {
    Neo4jSend
}