const friendRoutes = require('./routes/friend.route')
const baseRoutes = require('./routes/base.route')

const path = require('path')
const express = require('express')
const app = express()

app.set('view engine', 'hbs')
app.set('views', 'views')

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
})
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())

// app.use('/', baseRoutes)
app.get('/', (req,res)=>{
    res.render('index',{
        title: 'Intro',
        caption: "Hellow this is Assami Muzaki 001"
    })
})

app.get('/messages',(req,res)=>{
    res.render('messages',{
        title:'Messages Site Url',
        name:'Dodi S'
    })
})

app.use('/friends', friendRoutes)

app.listen(3000, ()=>console.log('server running on port 3000'))