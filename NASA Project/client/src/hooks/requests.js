const API_Path = 'http://localhost:8000'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_Path}/planets`)
  return await response.json()
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_Path}/launches`)
  const fetching = await response.json()
  return fetching.sort((a,b) =>[
    a.flightNumber - b.flightNumber
  ])
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try{
    return await fetch(`${API_Path}/launches`,{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(launch)
    });
  }catch(err){
    return{
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{
    return await fetch(`${API_Path}/launches/${id}`,{
      method:'DELETE'
    });
  }catch(err){
    return{
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};