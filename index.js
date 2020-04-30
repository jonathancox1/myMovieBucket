// get the main container
const movieContainer = document.querySelector(".moviesContainer");

let movies = [];


// document ready block
document.addEventListener('DOMContentLoaded', function () {
  function renderMovies(movieArray) {
    const movieHtmlArray = movieArray.map(function (currentMovie) {
      return `
            <div class="card mb-3 mr-4 w-100 shadow d-flex" style="max-width: 500px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${currentMovie.Poster}" class="card-img" height="250px" alt="${currentMovie.Title}" onerror="if (this.src != 'images/no_image.png') this.src = 'images/no_image.png';">
                </div>
                <div class="col-md-8">
                  <div class="card-body flex-column justify-content-between h-100">
                    <h5 class="card-title text-black mb-n1">${currentMovie.Title}</h5>
                    <small class="badge badge-pill badge-secondary mb-1">${currentMovie.Year}</small>
                    <br>
                    <span>
                    <a title="Add to your list" id="checkHREF" class="pl-1" onclick="saveToWatchList('${currentMovie.imdbID}')">
                    <i class="far fa-check-square fa-2x" id="${currentMovie.imdbID}"></i>
                    </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            `
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

    // access the OMDB API
    axios.get('http://www.omdbapi.com/?apikey=b43843a0&s=' + urlEncodedSearchString)
      .then(function (response) {
        movieContainer.innerHTML = renderMovies(response.data.Search);
        movies = response.data.Search;
        return movies;
      })
  })


});



// save to watch list
function saveToWatchList(imdbID) {
  // change the icon color to green, but only alters the first element with id checkHREF  - doesnt work correctly
  document.getElementById(imdbID).style.color = 'rgb(39, 199, 39)';
  document.getElementById(imdbID).parentElement.removeAttribute('onclick');

  // get the movie data
  const movie = movies.find(function (currentMovie) {
    return currentMovie.imdbID == imdbID;
  });
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);

  if (watchlist === null) {
    watchlist = []
    watchlist.push(movie);
  } else {
    watchlist.push(movie);
  }

  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);

}
