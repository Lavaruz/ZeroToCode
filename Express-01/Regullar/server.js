const express = require('express')
const app = express()

friends = [
    {id:0, name:'Assami Muzaki'},
    {id:1, name:'Joko Anwar'},
    {id:2, name:'Kodomo'},
]

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
})


app.use(express.json())


app.get('/', (req,res) =>{
    res.send('<h1> Hellow World</h1>')
})


app.get('/friends',(req,res)=>{
    res.json(friends)
})
app.post('/friends',(req,res)=>{
    if (!req.body.name){
        return res.status(400).json({
            error:'name not found'
        })
    }
    newFriend = {
        id: friends.length,
        name: req.body.name,
    }
    friends.push(newFriend)
    res.json(friends)
})
app.get('/friends/:frinedId',(req,res)=>{
    friendId = +req.params.frinedId
    friend = friends[friendId]
    if (friend){
        res.json(friend)
    }else{
        res.status(404).json({
            error:'friend not found'
        })
    }
})
app.listen(3000, ()=>console.log('server running on port 3000'))