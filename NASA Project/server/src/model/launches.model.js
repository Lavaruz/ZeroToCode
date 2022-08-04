const launches = new Map()
const launchesModel = require('./launches.mongo')

let latestflightNumber = 1

const launch = {
    flightNumber:latestflightNumber,
    launchDate: new Date('December 17, 2040'),
    rocket: 'Assami IS 18',
    mission: 'Explore 018 Kepler Exo',
    target: 'Kepler-18 b',
    customer: ['AM Fondation', 'NASA'],
    upcoming: true,
    success: true
}

// launches.set(launch.flightNumber, launch)
saveLaunch(launch)

async function saveLaunch(launch){
    await launchesModel.updateOne({
        flightNumber: launch.flightNumber
    }, launch,{
        upsert: true
    })
}

async function getAllLaunches(){
    return await launchesModel.find({}, '-_id -__v')
}

function addNewLaunch(launch){
    latestflightNumber += 1
    launches.set(latestflightNumber, Object.assign(launch,{
        flightNumber: latestflightNumber,
        upcoming: true,
        success: true,
        customer: ['AM Fondation','NASA']
    }))
}

function getLaunchWithId(launchId){
    return launches.has(launchId)
}

function abortLaunchById(launchId){
    const abort = launches.get(launchId)
    abort.success = false
    abort.upcoming = false
    return abort
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    getLaunchWithId,
    abortLaunchById
}