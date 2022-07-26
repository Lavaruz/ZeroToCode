const friendRoutes = require('./routes/friend.route')
const baseRoutes = require('./routes/base.route')

const express = require('express')
const app = express()

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
})
app.use(express.json())

app.use('/', baseRoutes)
app.use('/friends', friendRoutes)

app.listen(3000, ()=>console.log('server running on port 3000'))