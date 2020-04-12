//  init Classes
const api = new MovieApi();
const ui = new UI();
const dataApi = new DataApi();

// assign components

const searchRes = document.querySelector('.search-result');
const favourites = document.querySelector('.favourites');
const formLogin = document.getElementById('formlogin');
const btnLogin = document.getElementById('btnLoginUser');
const btnRegister = document.getElementById('btnRegisterUser');
const inputMovieName = document.getElementById('movieName');
let isLoggedIn = false;

// Event Listers

// Search for movies, each key up is a api call(not ideal but it works 😄)
inputMovieName.addEventListener('keyup', (e) => {
  const searchText = e.target.value;
  if (searchText == '') {
    ui.clearSearchResults();
  } else {
    api.searchMovies(searchText).then((data) => {
      ui.showResults(data);
    });
  }
});

// Add item to favourites
searchRes.addEventListener('click', (e) => {
  if (e.target.id === 'btnAddFav') {
    if (!isLoggedIn) {
      return ui.showAlert(
        'You can only add to favourites once logged in',
        'alert-warning'
      );
    }

    api.getMovieByID(e.target.dataset.movieId).then((data) => {
      dataApi
        .saveToFavourites({ movie_id: data.movieData.id })
        .then((savedRes) => {
          const res = savedRes.resp;

          if (res.err) {
            return ui.showAlert(res.message, 'alert-danger');
          }

          ui.addFavourite(data);
          return ui.showAlert('Movie added to favourites', 'alert-success');
        });
    });
  }
  e.preventDefault();
});

// Delete item from favourites
favourites.addEventListener('click', (e) => {
  if (e.target.id === 'removeItem') {
    dataApi
      .deleteFromFavourites({ movie_id: parseInt(e.target.dataset.movieid) })
      .then((savedRes) => {
        const res = savedRes.resp;

        if (res.err) {
          return ui.showAlert(res.message, 'alert-danger');
        }

        e.target.parentElement.parentElement.remove();
        ui.showAlert('Movie deleted', 'alert-success');
      });
  }

  e.preventDefault();
});

const LoginRegisterUser = (e) => {
  //check if form is valid
  if (!formLogin.reportValidity()) return;

  const formUserName = formLogin.querySelector('#userName').value;
  const formUserPassword = formLogin.querySelector('#userPass').value;

  let userData = {
    userName: formUserName,
    password: formUserPassword,
  };

  if (e.target.id === 'btnLoginUser') {
    Login(userData);
  } else {
    Register(userData);
  }
  e.preventDefault();
};

const Login = (userData) => {
  dataApi.loginUser(userData).then((respRes) => {
    //check for errors
    const resp = respRes.resp;
    if (resp.err) {
      return ui.showAlert(resp.message, 'alert-danger');
    }

    // Save User Details in Local Storage
    localStorage.setItem('movieData', JSON.stringify(resp));

    // Get All Favourites

    // Hide Login Form
    ui.loggedinMode('Hallo ' + resp.userName);
    isLoggedIn = true;

    // Display Favourites

    dataApi.getUserData().then((userDetails) => {
      const resp = userDetails.resp;
      if (resp.err) {
        return ui.showAlert(resp.message, 'alert-danger');
      }

      resp.favourites.forEach((favourite) => {
        api.getMovieByID(favourite).then((data) => {
          ui.addFavourite(data);
        });
      });
    });
  });
};

const Register = (userData) => {
  dataApi.registerUser(userData).then((respRes) => {
    //check for errors
    const resp = respRes.resp;
    if (resp.err) {
      return ui.showAlert(resp.message, 'alert-danger');
    }

    let userData = {
      userName: resp.userName,
      password: resp.password,
    };

    //Login User if registered Success
    ui.showAlert('Thank You for registering ', 'alert-success');
    Login(userData);
  });
};

const resetForm = () => {
  isLoggedIn = false;
  localStorage.removeItem('movieData');
  ui.loginMode();
};

document.addEventListener('DOMContentLoaded', function () {
  resetForm();
});

//Log Out Event handler
document.querySelector('.loginName').addEventListener('click', (e) => {
  if (e.target.id === 'btnLogout') {
    resetForm();
  }
});

btnLogin.addEventListener('click', LoginRegisterUser);
btnRegister.addEventListener('click', LoginRegisterUser);
