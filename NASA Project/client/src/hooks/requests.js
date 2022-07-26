// const API_Path = 'http://localhost:8000'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`/planets`)
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try{
    return await fetch(`/launches`,{
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
    return await fetch(`/launches/${id}`,{
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