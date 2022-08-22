a = [1,2,3,2,1]

let obj = {}
a.map((item, i) => obj[item] ? obj[item]+=1 : obj[item]=1)

for (let k in obj){
    if(obj[k] == 1){
        console.log(k);
    }
}