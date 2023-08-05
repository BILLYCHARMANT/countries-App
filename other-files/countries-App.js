const searchInput = document.getElementById('searchInput');
const countryList = document.getElementById('countryList');
const themeToggle = document.getElementById('themeToggle');

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  if (searchQuery === '') {
    countryList.innerHTML = '';
    return;
  }

  fetch(`https://restcountries.com/v3/name/${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      const countries = Array.isArray(data) ? data : [data];
      const countryHTML = countries
        .map((country) => `
          <div>
          <img src="${country.flags.png}" alt="${country.name.common}" width="100">
            <h2>${country.name.common}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
          </div>
        `)
        .join('');
      countryList.innerHTML = countryHTML;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      countryList.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    });
});

continentSelect.addEventListener('change', () => {
    updateDisplayedCountries();
  });
  
  function filterCountriesByContinent(selectedContinent) {
    if (selectedContinent === '') {
      return allCountriesData;
    }
    return allCountriesData.filter((country) => country.region === selectedContinent);
  }
  
  function updateDisplayedCountries() {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const selectedContinent = continentSelect.value;
  
    const filteredByContinent = filterCountriesByContinent(selectedContinent);
    const filteredBySearch = filteredByContinent.filter((country) => {
      return searchQuery === '' || country.name.common.toLowerCase().includes(searchQuery);
    });
    
  
    let countriesHTML = filteredBySearch
      .map((country) =>
      `
        <div>
        <img src="${country.flags[1]}" alt="${country.name.common}" width="100">
          <h2>${country.name.common}</h2>
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
        </div>
      `)
      .join('');
  
    countryList.innerHTML = countriesHTML;
    
  }
  
  
  fetch('https://restcountries.com/v3/all')
    .then((response) => response.json())
    .then((data) => {
      allCountriesData = data;
      populateContinentDropdown(data);
      updateDisplayedCountries();
    })
    .catch((error) => {
      // console.error('Error fetching data:', error);
    });
  

themeToggle.addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  const icon = isDarkMode ? '🌞Light Mode' : '🌙Dark Mode';
  themeToggle.innerText = icon;
});
