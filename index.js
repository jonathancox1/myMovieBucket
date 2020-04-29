// get the main container
const movieContainer = document.querySelector(".moviesContainer");



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
        <a href="#" title="Add to your list" id="checkHREF" class="pl-1">
        <span id="check">
        <i class="far fa-check-square fa-2x"></i>
        </span>
        </a>
      </div>
    </div>
  </div>
</div>
            `
        });
        const joined = movieHtmlArray.join('');
        console.log(joined)
        return joined;
    }
    const myForm = document.getElementById('search-form');
    myForm.addEventListener('submit', function (e) {
        e.preventDefault();
        movieContainer.innerHTML = renderMovies(movieData);

    })
});