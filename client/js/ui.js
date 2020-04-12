class UI {
  constructor() {
    this.searchResult = document.getElementById('searchResults');
    this.searchResult.style.display = 'none';
    this.favBar = document.querySelector('.favourites');
    this.loginForm = document.querySelector('#formlogin');
  }

  showResults(movieData) {
    let output = '';
    let movieResults = movieData.movieData.results;

    if (movieResults.length !== 0) {
      this.searchResult.style.display = 'block';
    } else {
      this.searchResult.style.display = 'none';
    }

    movieResults.forEach((movie) => {
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
          <div class="col md-10"></div>`;
      output += !isLoggedIn
        ? `<button type="button" data-movie-id="${movie.id}" id="btnAddFav" class=" btn btn-primary float-right float-right mr-4" style="opacity:0.3">`
        : `<button type="button" data-movie-id="${movie.id}" id="btnAddFav" class=" btn btn-primary float-right float-right mr-4">`;
      output += `Add to Favourites
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
    
    <div class="favourite card-body border border-primary m-2">
      <h4 class="card-title">${movieInfo.title}</h4>
      <p class="card-text">
        ${movieInfo.overview}
      </p>
      <div class="col mb-5">
        <button type="button" data-movieId=${movieInfo.id} id="removeItem" class=" btn btn-link float-right">
          Remove
        </button>
      </div>
    </div>
    `;
    this.favBar.innerHTML += output;
  }

  clearSearchResults() {
    this.searchResult.innerHTML = '';
    this.searchResult.style.display = 'none';
  }

  loginMode() {
    document.querySelector(
      '.loginName'
    ).innerHTML = `<span class="d-inline-block col-9">Login</span>`;
    this.favBar.style.display = 'none';
    this.loginForm.style.display = 'block';
    this.loginForm.reset();
    inputMovieName.value = '';
    this.clearSearchResults();
    this.clearFavourites();
  }

  // Clears The Favourites List
  clearFavourites() {
    const favs = document.querySelectorAll('.favourite');
    favs.forEach((fav) => {
      console.log(fav);
      this.favBar.removeChild(fav);
    });
  }

  loggedinMode(userName) {
    document.querySelector(
      '.loginName'
    ).innerHTML = `<span class="d-inline-block col-9">${userName}</span>`;

    //Create the logout Button
    var btnLogout = document.createElement('a');
    var linkext = document.createTextNode('Logout');
    btnLogout.appendChild(linkext);
    btnLogout.id = 'btnLogout';
    btnLogout.classList.add('d-inline-block');
    btnLogout.href = '#';
    btnLogout.title = 'Logout';
    document.querySelector('.loginName').appendChild(btnLogout);

    inputMovieName.value = '';
    this.clearSearchResults();
    this.favBar.style.display = 'block';
    this.loginForm.style.display = 'none';
  }

  showAlert(msg, classname) {
    let skipTimeout = false;
    // Check if message exists
    if (document.querySelector('.alert')) {
      document.querySelector('.alert').remove();
      skipTimeout = true;
    }

    // Create DIV
    const div = document.createElement('div');

    // Add Classes
    div.className = `alert ${classname}`;

    // Add Text
    div.appendChild(document.createTextNode(msg));

    // Get Parent
    const container = document.querySelector('.col');

    const form = document.querySelector('.search');

    // Insert Alert
    container.insertBefore(div, form);

    if (skipTimeout) return;

    setTimeout(function () {
      if (document.querySelector('.alert')) {
        document.querySelector('.alert').remove();
      }
    }, 3000);
  }
}
