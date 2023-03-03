import './css/styles.css';
import API from './fetchCountries';
import getRefs from './getRefs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  const searchField = e.target;
  const searchQuery = searchField.value;

  API.fetchCountries(searchQuery)
    // .then(rendercountryList)
    // .then(j => console.log(j))
    .catch(onFetchError)
    .finally(() => (searchField.value = ''));
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
