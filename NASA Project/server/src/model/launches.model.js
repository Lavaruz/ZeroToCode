const launches = new Map()
const launchesModel = require('./launches.mongo')
const planetsModel = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 1

const launch = {
    flightNumber: 1,
    launchDate: new Date('December 17, 2040'),
    rocket: 'Assami IS 18',
    mission: 'Explore 018 Kepler Exo',
    target: 'Kepler-1652 b',
    customer: ['AM Fondation', 'NASA'],
    upcoming: true,
    success: true
}

// launches.set(launch.flightNumber, launch)
saveLaunch(launch)

async function saveLaunch(launch){
    const planet = await planetsModel.findOne({keplerName: launch.target})
    if (!planet){
        throw new Error(`there is no ${launch.target} in the destination list`)
    }
    await launchesModel.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch,{
        upsert: true
    })
}

async function getAllLaunches(){
    return await launchesModel.find({}, '-_id -__v')
}

async function getLatestFlightNumber(){
    const latestFlightNumber = await launchesModel.findOne().sort('-flightNumber')
    if (!latestFlightNumber){
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestFlightNumber.flightNumber
}

async function addNewLaunch(launch){
    const latestNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch,{
        flightNumber: latestNumber,
        upcoming: true,
        success: true,
        customer: ['AM Fondation','NASA']
    })
    saveLaunch(newLaunch)
}

async function getLaunchWithId(launchId){
    return await launchesModel.findOne({
        flightNumber: launchId
    })
}

async function abortLaunchById(launchId){
    const aborted = await launchesModel.updateOne({
        flightNumber: launchId
    },{
        success: false,
        upcoming: false
    })
    return aborted.modifiedCount === 1
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    getLaunchWithId,
    abortLaunchById
}