// THIS SCRIPT USING ECMA SCRIPT 6
// SO IT CAN BE USE IMPORT AS AN IMPORTING MODULE
//  --- REQUREMENT ---
// 1. FILE EXTENSION MUST BE {.mjs}
// 2. ALL THE EXPORT MODULE JUST USING EXPORT NOT EXPORTS

import * as request from './request.mjs'
import * as response from './response.mjs'

function req(url,data){
    console.log(`sending ${data} to ${url}`);
    request.send(url,data)
    response.response()
}

req('https://www.google.com', 'hello')