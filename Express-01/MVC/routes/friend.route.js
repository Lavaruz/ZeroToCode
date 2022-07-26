const express = require('express')

const controllerFriends = require('../controllers/friends.controller')

const friendRoutes = express.Router()
friendRoutes.use((req,res,next)=>{
    console.log(req.ip);
    next()
})
friendRoutes.get('/', controllerFriends.getFriends)
friendRoutes.post('/',controllerFriends.postFriend)
friendRoutes.get('/:frinedId',controllerFriends.getOneFriend)

module.exports = friendRoutes