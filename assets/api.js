
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=s5s5W4AY0VqaGsnGf7llaUdGqadB841G",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
