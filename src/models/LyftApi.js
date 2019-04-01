const RIDES_LIMIT = 50;

export const fetchAllRides = (ridesArray, token, startDate, endDate) => {
  return fetch(
    `https://api.lyft.com/v1/rides?start_time=${startDate}&end_time=${endDate}&limit=${RIDES_LIMIT}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      if (response.status !== 200) {
        console.error(`Bad response from Lyft API: ${response.status}`);
        return Promise.reject();
      }
      return response.json();
    })
    .then(jsonData => {
      let newRides = jsonData.ride_history;
      ridesArray = ridesArray.concat(newRides);
      // Check if there are more rides to fetch
      if (newRides.length < RIDES_LIMIT) {
        return Promise.resolve(ridesArray);
      }

      // API returns most recent rides first, so we need to move backwards
      return fetchAllRides(
        ridesArray,
        token,
        startDate,
        newRides[newRides.length - 1].pickup.time
      );
    });
};
