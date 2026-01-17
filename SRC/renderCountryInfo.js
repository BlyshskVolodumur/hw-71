  export function renderCountryInfo(country) {
  const { name, capital, population, flags, languages } = country;

  const languagesList = Object.values(languages)
    .map(lang => `<li>${lang}</li>`)
    .join('');

  return `
    <div class="country-card">
      <h1 class="country-title">
        <img src="${flags.svg}" alt="Flag of ${name.common}" width="40" />
        ${name.common}
      </h1>

      <p><strong>Capital:</strong> ${capital.join(', ')}</p>
      <p><strong>Population:</strong> ${population.toLocaleString()}</p>

      <p><strong>Languages:</strong></p>
      <ul>${languagesList}</ul>
    </div>
  `;
}
