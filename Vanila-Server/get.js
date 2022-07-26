const http = require('http')

// IMAGINE AS A JSON DATA
data = [
    {id:0, name: 'Assami Muzaki'},
    {id:1, name: 'Dodo Supardi'}
]

const server = http.createServer((req,res)=>{

    params = req.url.split('/')

    if (req.url === '/home'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1>HELLOW WORLD</h1>')
        res.end('Hello this is vanila server')
    }
    else if(params[1] === 'data'){
        res.setHeader('Content-Type', 'application/json')

        // CHECKING IF IT HAS SPECIFIC NUMBER ENDPOINT
        // ex. localhost/data/1
        if (params.length === 3){
            res.write(JSON.stringify(data[Number(params[2])]))
        }
        // IF HAVEN'T
        // ex. localhost/data
        else{
            res.write(JSON.stringify(data))
        }
        res.end()
    }
    else{
        res.statusCode = 404;
        res.end()
    }
})

// !!! SAME AS ABOVE BUT ITS IN EVENT EMITER !!!

// server.on('request',(req,res)=>{
//     if (req.url === '/home'){
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<h1>HELLOW WORLD</h1>')
//         res.end('Hello this is vanila server')
//     }
//     else if(req.url === '/data'){
//         res.setHeader('Content-Type', 'application/json')
//         res.write(JSON.stringify({
//             id:1,
//             name:'Assami Muzaki',
//             value:'10/10'
//         }))
//         res.end()
//     }
//     else{
//         res.statusCode = 404;
//         res.end()
//     }
// })

server.listen(3000,()=>{
    console.log('server run');
})