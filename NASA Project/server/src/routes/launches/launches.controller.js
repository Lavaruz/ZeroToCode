const { getAllLaunches, addNewLaunch, getLaunchWithId, abortLaunchById } = require('../../model/launches.model')

async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getAllLaunches())
}

async function httpPostLaunch(req,res){
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

    await addNewLaunch(launch)
    return res.status(201).json(launch)
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