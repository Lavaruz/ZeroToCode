function timeConversion(s) {
    // Write your code here
    let newTime = s.split(':')
    
    if (newTime[0] == '12'){
        newTime[0] = '00'
    }
    if (s.includes('PM')){
        newTime[0] = Number(newTime[0])+12
    }
    newTime[2] = newTime[2].replace(/[AaPp][Mm]/,'')
    return (`${newTime.join(':')}`)
}

// 06:40:03AM => 06:40:03
// 12:00:00AM => 00:00:00