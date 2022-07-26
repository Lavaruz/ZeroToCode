const http = require('http')

friends = [
    {name:'Assami Muzaki'},
    {name:'Joko Suparno'}
]

const server = http.createServer((req,res)=>{
    if (req.url === '/friends' && req.method == "POST"){
        req.on('data',(data)=>{
            data = data.toString();
            // console.log(data);
            friends.push(JSON.parse(data))
        })
        req.pipe(res)
    }
    else if (req.url === '/friends' && req.method == 'GET'){
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(friends))
        console.log(JSON.stringify(friends));
    }
})

server.listen(3000, ()=>{
    console.log('Server running at port 3000');
})