const { getAllLaunches, addNewLaunch, getLaunchWithId, abortLaunchById } = require('../../model/launches.model')

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

function httpDeleteLaunch(req,res){
    launchId = +req.params.id

    if(!getLaunchWithId(launchId)){
        return res.status(404).json({
            error: 'launch not found !'
        })
    }
    const abort = abortLaunchById(launchId)
    return res.status(200).json(abort)
}

module.exports = {
    httpGetAllLaunches,
    httpPostLaunch,
    httpDeleteLaunch
}