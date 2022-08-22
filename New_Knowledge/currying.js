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
// let dragon = (name, size, element) =>{
//     return name + ' is a dragon' +
//     ' with a ' + size + ' body' +
//     ' that breath a ' + element
// }
// let dragonCurry = _.curry(dragon)

// console.log(dragonCurry('dodon')('medium')('time space'));

// TEST CASE NON CURRYING
let allDragon = [
    {name: 'fluffy', element: 'lighting'},
    {name: 'dodon', element: 'time space'},
    {name: 'noomu', element: 'lighting'},
    {name: 'gozzu', element: 'fire'},
]

let hasElement = (element, obj) => obj.element == element

let lightingDragonNC = allDragon.filter(x => hasElement('lighting', x))
// console.log(lightingDragon);


// TEST CASE CURRYING
let hasElementC = _.curry(hasElement)
let lightingDragonC = allDragon.filter(hasElementC('lighting'))
console.log(lightingDragonC);