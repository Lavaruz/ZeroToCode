function encrypt(data){
    return 'data has been encrypted'
}

function send(url,data){
    console.log(`make request to ${url}: ${encrypt(data)}`);
}

export { send }