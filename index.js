// get the main container
const movieContainer = document.querySelector(".moviesContainer");


// document ready block
document.addEventListener('DOMContentLoaded', function () {
  function renderMovies(movieArray) {
    const movieHtmlArray = movieArray.map(function (currentMovie) {
      return `
            <div class="card mb-3 mr-4 w-100 shadow d-flex" style="max-width: 500px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${currentMovie.Poster}" class="card-img" height="250px" alt="${currentMovie.Title}">
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
    movieContainer.innerHTML = renderMovies(movieData);
  })


});



// save to watch list
function saveToWatchList(imdbID) {
  // change the icon color to green, but only alters the first element with id checkHREF  - doesnt work correctly
  document.getElementById(imdbID).style.color = 'rgb(39, 199, 39)';

  const movie = movieData.find(function (currentMovie) {
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



  // console.log(`${watchlist} watchlist`)
  // let correctedList = watchlist.filter((item, index) => {
  //   return watchlist.indexOf(item) === index;
  // });
  // console.log(`${correctedList} corrected`);

  // let unique = [...new Set(watchlist)]
  // console.log(unique);


  // var newObj = []
  // Object.keys(watchlist).forEach(function (key) {
  //   if (watchlist[key] == imdbID) {
  //     newObj.push(movie);
  //     return newObj;
  //   }
  // });
  // console.log(newObj);

  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem('watchlist', watchlistJSON);

}
