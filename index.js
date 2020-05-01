// get the main container
const movieContainer = document.querySelector(".moviesContainer");

let movies = [];

// document ready block
document.addEventListener('DOMContentLoaded', function () {
  function renderMovies(movieArray) {
    const movieHtmlArray = movieArray.map(function (currentMovie) {
      console.log(movieArray);
      axios.get('http://www.omdbapi.com/?apikey=b43843a0&i=' + currentMovie.imdbID)
        .then(function (response) {
          movieContainer.innerHTML += (`
            <div class="card mb-3 mr-4 w-100 shadow d-flex" style="max-width: 500px;">
              <div class="row no-gutters">
                <div class="col-md-4 h-100 d-flex">
                  <img src="${response.data.Poster}" class="card-img m-2" height="100%" width="200px" alt="${response.data.Title}" onerror="if (this.src != 'images/no_image.png') this.src = 'images/no_image.png';">
                </div>
                <div class="col-md-8">
                  <div class="card-body flex-column justify-content-between h-100">
                    <h5 class="card-title text-black mb-n1">${response.data.Title}</h5>
                    <small class="badge badge-pill badge-secondary mb-1">${response.data.Year}</small> 
                    <img src="images/imdb.jpg" width="30px">
                    <small>${response.data.Ratings[0].Value}</small>
                    <br>
                    <span>
                    <a title="Add to your list" id="checkHREF" class="pl-1 text-center" onclick="saveToWatchList('${response.data.imdbID}')">
                    <i class="far fa-check-square fa-2x" id="${response.data.imdbID}"></i>
                    </a>
                    <small id="added${response.data.imdbID}">add to watchlist</small>
                    </span>          
                    <br>
                    <small>${response.data.Actors}</small>
                    <br>
                    ${response.data.Plot}
                  </div>
                </div>
              </div>
            </div>
      `)
        })
    });
    const joined = movieHtmlArray.join('');
    return joined;
  }

  // search bar
  const myForm = document.getElementById('search-form');
  myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // find searchbar .var() and correctly encode the users input
    const searchString = $('#searchBar').val();
    const urlEncodedSearchString = encodeURIComponent(searchString);

    // access the OMDB API, api key, &, s is default search
    // t, is title and gives more info
    axios.get('http://www.omdbapi.com/?apikey=b43843a0&s=' + urlEncodedSearchString)
      .then(function (response) {
        movieContainer.innerHTML = "";
        renderMovies(response.data.Search);
        movies = response.data.Search;
        return movies;
      })
  })


});


// save to watch list
function saveToWatchList(imdbID) {
  $(`#added${imdbID}`).text('added');
  $(`#added${imdbID}`).fadeOut(1000, 'swing', function () {
  });


  // change the icon color to green, but only alters the first element with id checkHREF 
  document.getElementById(imdbID).style.color = 'rgb(39, 199, 39)';
  document.getElementById(imdbID).parentElement.removeAttribute('onclick');

  // get the movie data
  const movie = movies.find(currentMovie => currentMovie.imdbID == imdbID);
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);


  // add some sort of filter function to determine if imdbID is already in localStorage
  // to prevent duplicates 
  if (watchlist === null) {
    watchlist = []
  }

  let watchlistMovie = watchlist.find(currentMovie => currentMovie.imdbID == imdbID);
  if (!watchlistMovie) {
    watchlist.push(movie);
  }
  console.log(watchlist);


  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);

}
