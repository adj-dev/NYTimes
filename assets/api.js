
function getArticles(searchTerm, numArticles, startYear, endYear) {
  // Convert numArticles to a Number
  const numArticlesInt = parseInt(numArticles);

  /*
    A variable is declared below to potentially hold the value of a url
    parameter to specify a range of publication years. Because startYear
    and endYear are optional input values we start by declaring "yearRange"
    as an empty string so that it doesn't affect the ajax request in the 
    case that the user doesn't select a start year AND end year. 

    The "if/else if" basically changes the value of yearRange according 
    to what arguments are passed into the function for startYear and/or
    endYear.
  */

  let yearRange = ''
  // Create a reference to the current year
  const currentYear = new Date().getFullYear();
  // logic for startYear and endYear
  if (startYear && endYear) {
    yearRange = ` AND pub_year:[${startYear} TO ${endYear}]`;
  } else if (startYear) {
    yearRange = ` AND pub_year:[${startYear} TO ${currentYear}]`;
  } else if (endYear) {
    yearRange = ` AND pub_year:[0 TO ${endYear}]`;
  }

  /*
    The following constant "filterQuery" represents a url param that we can 
    add to the api's url to specify any requirements we might have for returned articles. 
    filterQuery is of type String and the format/syntax used is determined by the 
    NYTimes api (https://developer.nytimes.com/docs/articlesearch-product/1/overview). 

    The above "yearRange" variable also ends up as a url param if startYear and/or
    endYear arguments are provided.

    I utilize this url param by injecting it into the url property of the 'settings'
    variable using a `template literal`. I use this method all the time and much prefer
    it over string concatenation. If you feel so inclined to understand more about
    template literals click this: 
    https://codeburst.io/javascript-what-are-template-literals-5d08a50ef2e3

    Also, for clarification: I inject "searchTerm" - the first argument passed
    into this function - into the url using template literals, as well. 
  */

  // Narrow down search to help prevent a returned "author" value of null. 
  const filterQuery = '&fq=section_name.contains:("Magazine" "Sunday Magazine" "Books" "Science" "Sports" "Style" "Business" "Arts")';


  // Declare the settings for ajax method
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}${filterQuery}${yearRange}&api-key=s5s5W4AY0VqaGsnGf7llaUdGqadB841G`,
    "method": "GET",
    "headers": {}
  }

  // Make a call to the NYTimes article db and handle the response
  $.ajax(settings).done(function (response) {
    // Create an array to hold the correct number of requested articles
    const articles = [];
    const docs = response.response.docs;
    // Loop through the docs
    for (let i = 0; i < numArticlesInt; i++) {
      // Insert an object into "const articles" with title, abstract, url and author properties
      // for each retrieved document. Only grabs the number of documents specified by the 
      // numArticlesInt argument.  
      articles.push({
        title: docs[i].headline.main,
        abstract: docs[i].abstract,
        url: docs[i].web_url,
        author: docs[i].byline.original
      });
    }

    /*
      The following function call is a mock function that simply console.log()'s the given argument 
      to the console. Eventually, the rendering wizards of the Front-End team will conjure up the 
      working version. 
    */
    frontEndRenderingMagic(articles);
  });
}

// FOR TESTING PURPOSES ONLY (not recommended for production)
function frontEndRenderingMagic(apiMagic) {
  console.log(apiMagic);
};
