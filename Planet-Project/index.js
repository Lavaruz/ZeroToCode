const {parse} = require('csv-parse')
const fs = require('fs')

function filter(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

let habitablePlanet = []

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data',(data)=>{
        if (filter(data)){
            habitablePlanet.push(data)
        }
    })
    .on('error', function(err){
        console.log(err.message);
      })
    .on('end',()=>{
        console.log(`${habitablePlanet.length} habitable planet found`);
        console.log(habitablePlanet.map((planet)=>{
            return planet['kepler_name']
        }));
    })


// IT TAKE TIME FOR STREAMER TO DO HIS JOBS AND STREAMERS ARE ASYNCHROUS
// setTimeout(()=>{
//     console.log(habitablePlanet.map((planet)=>{
//         return planet['kepler_name']
//     }));
// },1000)