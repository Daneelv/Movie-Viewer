class UI {
  constructor() {
    this.searchResult = document.getElementById('searchResults');
    this.searchResult.style.display = 'none';
    this.favBar = document.querySelector('.favourites');
  }

  showResults(movieData) {
    let output = '';
    let movieResults = movieData.movieData.results;

    if (movieResults.length !== 0) {
      this.searchResult.style.display = 'block';
    } else {
      this.searchResult.style.display = 'none';
    }

    movieResults.forEach(movie => {
      output += `
        <div class="card-body border border-primary mb-2 mt-2">
        <h4 class="card-title">${movie.title}</h4>

        <!-- images config api https://api.themoviedb.org/3/configuration?api_key=531eaffcac14a8c431f91d7a77a345e8 -->
        <div class="row m-3">
          <div class="col-3">`;
      output +=
        movie.poster_path != null
          ? `<img src= https://image.tmdb.org/t/p/w92${movie.poster_path} alt = ${movie.title} />`
          : `<img style = 'width:92px' src= 'https://www.carnival.com/_ui/responsive/ccl/assets/images/notfound_placeholder.svg' alt = ${movie.title} />`;
      output += `</div>
          <div class="col-9">
            <p class="card-text">
              ${movie.overview}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col md-10"></div>
          <button type="button" data-movie-id="${movie.id}" class=" btnAdd btn btn-primary float-right float-right mr-4">
            Add to Favourites
          </button>
        </div>
      </div>
      `;
    });

    this.searchResult.innerHTML = output;
  }

  addFavourite(movieData) {
    let movieInfo = movieData.movieData;
    let output = `
    
    <div class="card-body border border-primary m-2">
    <h4 class="card-title">${movieInfo.title}</h4>
    <p class="card-text">
      ${movieInfo.overview}
    </p>
    <div class="col md-10"></div>
    <button type="button" class=" btn btn-link float-right">
      Remove
    </button>
    </div>
    `;
    console.log(movieData);
    this.favBar.innerHTML += output;
  }

  clearSearchResults() {
    this.searchResult.innerHTML = '';
    this.searchResult.style.display = 'none';
  }
}
