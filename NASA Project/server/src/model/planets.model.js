const {parse} = require('csv-parse')
const fs = require('fs')
const path = require('path')

const planetsModel = require('./planets.mongo')

function filteringPlanets(planet){
    return planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
}


function loadPlanets(){
    return new Promise((resolve, rejects) =>{
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', async (data)=>{
            if (filteringPlanets(data)){
                await insertData(data)
            }
        })
        .on('end', async ()=>{
            const countPlanets = (await getAllPlanets()).length
            console.log(`${countPlanets} planets found`);
            resolve()
        })
    } 
)}

async function getAllPlanets(){
    return await planetsModel.find({}, {
        _id:0, __v:0
    })
}

async function insertData(data){
    return await planetsModel.updateOne({
        keplerName: data.kepler_name
    },{
        keplerName: data.kepler_name
    },{
        upsert: true
    })
}

module.exports = {
    loadPlanets,
    getAllPlanets,
}