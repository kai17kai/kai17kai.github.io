fetch("https://the-trivia-api.com/api/questions?limit=1&region=US&difficulty=easy")
.then((response) => response.json())
.then(data => console.log(data));
