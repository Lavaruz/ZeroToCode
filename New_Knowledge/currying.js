const _ = require('lodash')

// STANDARD FUNCTION
// let dragon = (name, size, element) =>{
//     return name + ' is a dragon' +
//     ' with a ' + size + ' body' +
//     ' that breath a ' + element
// }

// console.log(dragon('noomu','tiny','lighting'));


// CURRYING FUNCTION
// let dragon =
//     name =>
//         size => {
//             return name + ' is a ' + size + ' dragon '
//         }

// console.log(dragon('fluffiy')('big'));


// USING LODASH TO CURRY
let dragon = (name, size, element) =>{
    return name + ' is a dragon' +
    ' with a ' + size + ' body' +
    ' that breath a ' + element
}
let dragonCurry = _.curry(dragon)

console.log(dragonCurry('dodon')('medium')('time space'));