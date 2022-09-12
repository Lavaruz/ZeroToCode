interface studentData {
    name: string,
    age: number
}

const students = (info: studentData) => {
    console.log('student created');
    
}
students({name: 'Assami', age: 18})
