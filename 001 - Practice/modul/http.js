// THIS IS COMMON JS WHERE NODE USES
// WE JUST HAVE TO USE REQUIRE AS USUAL
// AND EXPORTING USING (module.exports = {})

const request = require('./request')
const response = require('./response')

function req(url,data){
    console.log(`sending ${data} to ${url}`);
    request.send(url,data)
    response.response()
}

req('https://www.google.com', 'hello')