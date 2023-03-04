export class Country {
  constructor({ countryList, countryInfo }) {
    this.countryList = countryList;
    this.countryInfo = countryInfo;
  }
  clearAll() {
    this.clearList();
    this.clearDetails();
  }

  clearList() {
    this.countryList.innerHTML = '';
  }

  clearDetails() {
    this.countryInfo.innerHTML = '';
  }

  renderList(countries = []) {
    this.countryList.innerHTML = countries
      .map(
        ({ flags, name }) =>
          `<li class="country-list__item">
        <img
          class="country-list__img"
          src="${flags.svg}"
          width="60"
          height="30"          
          alt="${flags.alt}"
        />
        <p class="country-list__text">${name.official}</p>
      </li>`
      )
      .join('');
  }

  renderDetails({ flags, name, capital, languages, population }) {
    this.countryInfo.innerHTML = `<div class="country-info__header">
          <img
            class="country-list__img"
            src="${flags.svg}"
            width="60"
            height="30"
            alt="${flags.alt}"
          />
          <h3 class="country-info__title">${name.official}</h3></div>
          <ul class="country-info__list">
            <li class="country-info__item">
              <b><p>Capital:</p></b>
              <p>${capital}</p>
            </li>
            <li class="country-info__item">
              <b><p>Population:</p></b>
              <p>${population}</p>
            </li>
            <li class="country-info__item">
              <b><p>Languages:</p></b>
              <p>${Object.values(languages).join(', ')}</p>
            </li>
          </ul>
        `;
  }
}
