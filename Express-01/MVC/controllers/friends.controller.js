const friendModel = require('../models/friends.model')

function getFriends(req,res){
    res.json(friendModel)
}

function postFriend(req,res){
    if (!req.body.name){
        return res.status(400).json({
            error:'name not found'
        })
    }
    newFriend = {
        id: friendModel.length,
        name: req.body.name,
    }
    friendModel.push(newFriend)
    res.json(friendModel)
}

function getOneFriend(req,res){
    friendId = +req.params.frinedId
    friend = friendModel[friendId]
    if (friend){
        res.json(friend)
    }else{
        res.status(404).json({
            error:'friend not found'
        })
    }
}

module.exports = {
    getFriends,
    postFriend,
    getOneFriend
}