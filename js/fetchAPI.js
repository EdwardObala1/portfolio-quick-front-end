function fetchAPI(endpoint){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);

    xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        // Request was successful
        var responseData = JSON.parse(xhr.responseText);
        console.log(responseData[0]);
        return target
    } else {
        // Request failed
        console.error('Request failed with status:', xhr.status);
    }
    };

    xhr.onerror = function () {
    // There was a network error
    console.error('Network error occurred');
    };

    xhr.send();
}

fetchAPI('http://localhost:8000/api/experiences')

function cache_results(endpoint){
    var results = fetchAPI(endpoint);
    return results
}