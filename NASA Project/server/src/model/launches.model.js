const axios = require('axios')

const launchesModel = require('./launches.mongo')
const planetsModel = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 1

const launch = {
    flightNumber: 1,
    launchDate: new Date('December 17, 2040'),
    rocket: 'Assami IS 18',
    mission: 'Explore 018 Kepler Exo',
    target: 'Kepler-1652 b',
    customers: ['AM Fondation', 'NASA'],
    upcoming: true,
    success: true
}

// launches.set(launch.flightNumber, launch)
// saveLaunch(launch)

async function saveLaunch(launch){
    await launchesModel.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch,{
        upsert: true
    })
}


// LOAD API
API_URL = 'https://api.spacexdata.com/v4/launches/query'
async function populateAPI(){
    console.log('Downloading API SpaceX');
    const response = await axios.post(API_URL,{
        query: {},
        options: {
            pagination: false,
            populate:[
            {
                path: 'rocket',
                select: {
                    'name': 1
                }
            },
            {
                path: 'payloads',
                select: {
                    'customers': 1
                }
            }
        ]
        },
    });

    if (response.status != 200){
        console.log('Problem on downloading API Launch SpaceX');
    }

    const launchDocs = response.data.docs
    for(const launchDoc of launchDocs){
        const payloads = launchDoc.payloads
        const customers = payloads.flatMap(payload =>{
            return payload.customers
        })
        const launch = {
            flightNumber: launchDoc.flight_number,
            launchDate: launchDoc.date_local,
            rocket: launchDoc.rocket.name,
            mission: launchDoc.name,
            upcoming: launchDoc.upcoming,
            success: launchDoc.success,
            customers: customers,
        }
        // console.log(`${launch.flightNumber} ${launch.mission}`);
        await saveLaunch(launch)
    }
}

async function loadAPI(){
    const findAPI = await findLaunch({
        flightNumber: 1,
        mission: 'FalconSat'
    })
    
    if (findAPI){
        console.log('API LOADED !');
    }else{
        populateAPI()
        // console.log('Launch Saved to database!');
    }
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
    const planet = await planetsModel.findOne({keplerName: launch.target})
    if (!planet){
        throw new Error(`there is no ${launch.target} in the destination list`)
    }
    const latestNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch,{
        flightNumber: latestNumber,
        upcoming: true,
        success: true,
        customers: ['AM Fondation','NASA']
    })
    saveLaunch(newLaunch)
}

async function findLaunch(filter){
    return await launchesModel.findOne(filter)
}

async function getLaunchWithId(launchId){
    return await findLaunch({
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
    abortLaunchById,
    loadAPI
}