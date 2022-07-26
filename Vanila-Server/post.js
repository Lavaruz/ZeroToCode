const http = require('http')

// IMAGINE AS A JSON DATA
friends = [
    {id:0, name: 'Assami Muzaki'},
    {id:1, name: 'Dodo Supardi'}
]

const server = http.createServer((req,res)=>{

    params = req.url.split('/')

    if(req.method === 'POST' && params[1] === 'data'){
        req.on('data', (data)=>{
            stringData = data.toString()
            console.log(stringData);
            friends.push(stringData)
        })
    }

    else if(req.method === 'GET' && params[1] === 'data'){
        res.setHeader('Content-Type', 'application/json')

        // CHECKING IF IT HAS SPECIFIC NUMBER ENDPOINT
        // ex. localhost/data/1
        if (params.length === 3){
            res.write(JSON.stringify(friends[Number(params[2])]))
        }
        // IF HAVEN'T
        // ex. localhost/data
        else{
            res.write(JSON.stringify(friends))
        }
        res.end()
    }
    else{
        res.statusCode = 404;
        res.end()
    }
})


server.listen(3000,()=>{
    console.log('server run');
})