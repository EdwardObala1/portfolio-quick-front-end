const cachedData = {};

function fetchAPI(endpoint) {
  if (cachedData[endpoint] && Date.now() - cachedData[endpoint].timestamp < cacheExpirationTime) {
    // Data is still valid, use the cached data
    return Promise.resolve(cachedData[endpoint].data);
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', endpoint, true);

  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Request was successful
        const responseData = JSON.parse(xhr.responseText);
        // console.log(responseData);
        // Cache the fetched data
        cachedData[endpoint] = {
          data: responseData,
          timestamp: Date.now(),
        };
        resolve(responseData);
        return responseData
      } else {
        // Request failed
        console.error('Request failed with status:', xhr.status);
        reject(new Error('Request failed with status: ' + xhr.status));
      }
    };

    xhr.onerror = function () {
      // There was a network error
      console.error('Network error occurred');
      reject(new Error('Network error occurred'));
    };

    xhr.send();
  });
}

function cache_results(endpoint){
    var results = fetchAPI(endpoint);
    return results
}