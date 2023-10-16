document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var user = document.getElementById("user").value;
    var domain = document.getElementById("domain").value;

    // Make an AJAX request to the server
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/search?user=${user}&domain=${domain}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText);
            displayResults(results);
        }
    };
    xhr.send();
});

function displayResults(results) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    results.forEach(function(result) {
        var resultDiv = document.createElement("div");
        resultDiv.textContent = `User: ${result.user}, Domain: ${result.domain}, Password: ${result.password}`;
        resultsDiv.appendChild(resultDiv);
    });
}
