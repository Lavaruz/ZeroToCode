animals = [
    {name: 'dody', species: 'dog'},
    {name: 'pushs', species: 'cat'},
    {name: 'dodo', species: 'dog'},
]

let isDog = (x) => x.species == 'dog'
console.log('dog : ',animals.filter(isDog));
// console.log('not dog : '+animals.reject(isDog));