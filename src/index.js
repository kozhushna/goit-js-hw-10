import './css/styles.css';
import countryService from './fetchCountries';
import getRefs from './getRefs';
import { Country } from './markupCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const country = new Country(refs);

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  const searchField = e.target;
  const searchQuery = searchField.value.trim();
  if (searchQuery === '') {
    country.clearAll();
    return;
  }
  countryService
    .fetchCountries(searchQuery)
    .then(onFetchSuccess)
    .catch(onFetchError);
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  country.clearAll();
}

function onFetchSuccess(countries) {
  const count = countries.length;

  if (count > 10) {
    country.clearAll();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (count === 1) {
    country.clearList();
    country.renderDetails(countries[0]);
  } else {
    country.clearDetails();
    country.renderList(countries);
  }
}
