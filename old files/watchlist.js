// get the main container
const movieContainer = document.querySelector(".moviesContainer");

// access local storage and get watchlist
const watchlistJSON = localStorage.getItem('watchlist');
const watchlist1 = JSON.parse(watchlistJSON);


// document ready block
document.addEventListener('DOMContentLoaded', function () {
    movieContainer.innerHTML = renderMovies(watchlist1);
});

// render function 
function renderMovies(watchlist1) {
    if (watchlist1 === null || watchlist1.length == 0) {
        return `<div class="row mx-auto">Your List is Empty</div>`
    } else {
        const movieHtmlArray = watchlist1.map(function (currentMovie) {
            return `
          <div class="card mb-3 mr-4 w-100 shadow d-flex" style="max-width: 500px;" id="${currentMovie.imdbID}">
            <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${currentMovie.Poster}" class="card-img" height="250px" alt="${currentMovie.Title}" onerror="if (this.src != 'images/no_image.png') this.src = 'images/no_image.png';">
            </div>
            <div class="col-md-8">
                <div class="card-body flex-column justify-content-between h-100">
                <h5 class="card-title text-black mb-n1">${currentMovie.Title}</h5>
                <small class="badge badge-pill badge-secondary mb-1">${currentMovie.Year}</small>
                <br>
                <a title="Add to your list" id="ex" class="pl-1" onclick="removeFromWatchList('${currentMovie.imdbID}')">
                <span id="ex">
                <i class="far fa-window-close fa-2x"></i>
                </span>
                </a>
                </div>
            </div>
            </div>
        </div>
          `
        })
        const joined = movieHtmlArray.join('');
        return joined;
    }
}


// Remove from watch list
function removeFromWatchList(imdbID) {

    // jQuery animation
    $(`#${imdbID}`).on('click', function () {
        $(this).slideToggle(500, 'swing', function () {
            $(this).remove();
        });
    })

    // find the clicked movie in the localStorage and remove it
    const movie = watchlist1.find(function (currentMovie) {
        return currentMovie.imdbID == imdbID;
    });
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    let updatedWatchList = watchlist.filter(item => {
        return item.Title != movie.Title
    })

    // rewrite localStorage
    watchlistJSON = JSON.stringify(updatedWatchList);
    localStorage.setItem('watchlist', watchlistJSON);
}
