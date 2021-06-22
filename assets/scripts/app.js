const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = document.querySelector('.btn--passive');
const confirmAddMovieBtn = document.querySelector('.btn--success');

const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

function toggleBackdrop() {
  backdrop.classList.toggle('visible');
}

function updateUI() {
  if (movies.length === 0) entryTextSection.style.display = 'block';
  else entryTextSection.style.display = 'none';
}

function closeMovieDeletionModal() {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
}

function deleteMovieHandler(movieId) {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
}

function confirmDeleteMovieHandler(movieId) {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let performDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  performDeletionBtn.replaceWith(performDeletionBtn.cloneNode(true));
  performDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal);

  cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
  performDeletionBtn.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
}

function renderNewMovieElement(id, title, imageURL, rating) {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageURL}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener('click', confirmDeleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
}

function closeMovieModal() {
  addMovieModal.classList.remove('visible');
}

function openMovieModal() {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
}

function clearMovieInput() {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
}

function cancelAddMovieHandler() {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
}

function addMovieHandler() {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
}

function backdropClickHandler() {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
}

startAddMovieBtn.addEventListener('click', openMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
