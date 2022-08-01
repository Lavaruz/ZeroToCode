const { rejects } = require('assert')
const {parse} = require('csv-parse')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

function filteringPlanets(planet){
    return planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
}

habitablePlanets = []


function loadPlanets(){
    return new Promise((resolve, rejects) =>{
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data)=>{
            if (filteringPlanets(data)){
                habitablePlanets.push(data)
            }
        })
        .on('end', ()=>{
            console.log(`${habitablePlanets.length} planets found`);
            resolve()
        })
    } 
)}

function getAllPlanets(){
    return habitablePlanets
}

module.exports = {
    loadPlanets,
    getAllPlanets,
}