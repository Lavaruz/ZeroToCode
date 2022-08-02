const os = require('os')

// console.log(os.cpus().length);

for (const x of Array(os.cpus().length).keys()){
    console.log(x);
}