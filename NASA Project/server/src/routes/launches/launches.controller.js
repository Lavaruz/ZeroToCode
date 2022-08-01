const { getAllLaunches, addNewLaunch } = require('../../model/launches.model')

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches())
}

function httpPostLaunch(req,res){
    const launch = req.body
    if (!launch.mission || !launch.launchDate || !launch.target || !launch.rocket){
        return res.status(400).json({
            error: 'missing launches property'
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    if (isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'invalid date'
        })
    }

    addNewLaunch(launch)
    return res.status(201).json(getAllLaunches())
}

module.exports = {
    httpGetAllLaunches,
    httpPostLaunch
}