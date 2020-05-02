// get the main container
const movieContainer = document.querySelector(".moviesContainer");

// global variable to be reassigned later
let movies = [];

// document ready block
document.addEventListener('DOMContentLoaded', function () {

    // search bar
    const myForm = document.getElementById('search-form');
    myForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // find searchbar .val() and correctly encode the users input
        const searchString = $('#searchBar').val();
        const urlEncodedSearchString = encodeURIComponent(searchString);

        // access the OMDB API, api key, &, s is default search
        // t, is title and gives more info
        axios.get('https://www.omdbapi.com/?apikey=b43843a0&s=' + urlEncodedSearchString)
            .then(function (response) {
                movieContainer.innerHTML = "";
                renderMovies(response.data.Search);
                // movies = response.data.Search;
                return movies;
            })
    })
});

// render movies from search
function renderMovies(movieArray) {
    const movieHtmlArray = movieArray.map(function (currentMovie) {
        axios.get('https://www.omdbapi.com/?apikey=b43843a0&i=' + currentMovie.imdbID)
            .then(function (response) {
                movies.push(response.data);
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

// watchlist button event listener
$('#watchlist').on('click', function () {
    // access local storage and get watchlist
    const watchlistJSON = localStorage.getItem('watchlist');
    const watchlist1 = JSON.parse(watchlistJSON);
    // call renderWatchlist
    renderWatchlist(watchlist1);
})

// render movies from watchlist
function renderWatchlist(watchlist1) {
    movieContainer.innerHTML = "";
    if (watchlist1 === null || watchlist1.length == 0) {
        movieContainer.innerHTML += (`<div class="row mx-auto">Your List is Empty</div>`)
    } else {
        const movieHtmlArray = watchlist1.map(function (currentMovie) {
            movieContainer.innerHTML += (`
            <div class="card mb-3 mr-4 w-100 shadow d-flex" style="max-width: 500px;" id=${currentMovie.imdbID}>
            <div class="row no-gutters">
              <div class="col-md-4 h-100 d-flex">
                <img src="${currentMovie.Poster}" class="card-img m-2" height="100%" width="200px" alt="${currentMovie.Title}" onerror="if (this.src != 'images/no_image.png') this.src = 'images/no_image.png';">
              </div>
              <div class="col-md-8">
                <div class="card-body flex-column justify-content-between h-100">
                  <h5 class="card-title text-black mb-n1">${currentMovie.Title}</h5>
                  <small class="badge badge-pill badge-secondary mb-1">${currentMovie.Year}</small> 
                  <img src="images/imdb.jpg" width="30px">
                  <small>${currentMovie.Ratings[0].Value}</small>
                  <br>
                  <a title="Remove from your list" id="ex" class="pl-1" onclick="removeFromWatchList('${currentMovie.imdbID}')">
                  <span id="ex">
                  <i class="far fa-window-close fa-2x"></i>
                  </span>
                  </a>                
                  <br>
                  <small>${currentMovie.Actors}</small>
                  <br>
                  ${currentMovie.Plot}
                </div>
              </div>
            </div>
          </div>

          `)
        })
        const joined = movieHtmlArray.join('');
        return joined;
    }

}



// save to watch list
function saveToWatchList(imdbID) {
    $(`#added${imdbID}`).text('added');
    $(`#added${imdbID}`).fadeOut(1000, 'swing', function () {
    });

    // change the icon color to green 
    document.getElementById(imdbID).style.color = 'rgb(39, 199, 39)';
    document.getElementById(imdbID).parentElement.removeAttribute('onclick');

    console.log(movies);
    console.log('save to watchlist');
    // get the movie data
    const movie = movies.find(currentMovie => currentMovie.imdbID == imdbID);
    let watchlistJSONSave = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSONSave);

    // if watchlist doesnt exist, meaning first time accessing site, create an empty array
    if (watchlist === null) {
        watchlist = []
    }

    // find loos for the clicked movie in the localStorage, if it doesnt exist, it pushes it into watchlist array
    let watchlistMovie = watchlist.find(currentMovie => currentMovie.imdbID == imdbID);
    if (!watchlistMovie) {
        watchlist.push(movie);
    }

    // re-writes localStorage
    watchlistJSONSave = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSONSave);

}

// Remove from watch list
function removeFromWatchList(imdbID) {
    console.log(imdbID)

    // jQuery animation
    $(`#${imdbID}`).on('click', function () {
        $(this).slideToggle(500, 'swing', function () {
            $(this).remove();
        });
    })

    // access local storage and get watchlist
    const watchlistJSON = localStorage.getItem('watchlist');
    const watchlist1 = JSON.parse(watchlistJSON);
    console.log(watchlist1);

    // find the imdbID of clicked movie
    const movie = watchlist1.find(function (currentMovie) {
        return currentMovie.imdbID == imdbID;
    });
    console.log(movie);
    // 
    let watchlistJSONRemove = localStorage.getItem('watchlist');
    let watchlistRemove = JSON.parse(watchlistJSONRemove);
    let updatedWatchList = watchlistRemove.filter(item => {
        return item.Title != movie.Title
    })

    // rewrite localStorage
    watchlistJSONRemove = JSON.stringify(updatedWatchList);
    localStorage.setItem('watchlist', watchlistJSONRemove);
}


/* <div class="card mb-3 mr-4 w-100 shadow d-flex" style="max-width: 500px;">
<div class="row no-gutters">
  <div class="col-md-4 h-100 d-flex">
  <img src="${currentMovie.Poster}" class="card-img" height="250px" alt="${currentMovie.Title}" onerror="if (this.src != 'images/no_image.png') this.src = 'images/no_image.png';">
</div>
<div class="col-md-8">
  <div class="card-body flex-column justify-content-between h-100">
  <h5 class="card-title text-black mb-n1">${currentMovie.Title}</h5>
  <small class="badge badge-pill badge-secondary mb-1">${currentMovie.Year}</small>
  <br>
  <a title="Remove from your list" id="ex" class="pl-1" onclick="removeFromWatchList('${currentMovie.imdbID}')">
  <span id="ex">
  <i class="far fa-window-close fa-2x"></i>
  </span>
  </a>
  </div>
</div>
</div>
</div> */
