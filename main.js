const countriesEl = document.getElementById('countries');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');



getCountries();
async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json();

    displayCountries(countries);
}


function displayCountries(countries) {
    countriesEl.innerHTML = '';

    countries.forEach(country => {
        
    const countryEl = document.createElement('div');
    countryEl.classList.add('card');

    countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Flag" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>population: </strong>
                    ${country.population}
                </p>
                <p>
                    <strong>Region: </strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital: </strong>
                    ${country.capital}
                  </p>
            </div>

    `;

        countryEl.addEventListener('click', () => {
            modal.style.display = 'flex';
            showCountryDetails(country);
        });
            countriesEl.appendChild(countryEl);
        
        });

}


function showCountryDetails(country) {
        const modalBody = modal.querySelector('.modal-body');
        const modalImg = modal.querySelector('img');

        modalImg.src = country.flag;
        
        modalBody.innerHTML = `
            <h3>${country.name}</h3>
            <p>
                <strong>Native Name:</strong>
                ${country.nativeName}
            </p>
            <p>
                <strong>population: </strong>
                ${country.population}
            </p>
            <p>
                <strong>Region: </strong>
                ${country.region}
            </p>
            <p>
                <strong>Sub Region:</strong>
                ${country.subregion}
            </p>
            <p>
                <strong>Capital: </strong>
                ${country.capital}
            </p>
            <p>
                <strong>Top Level Domain:</strong>
                ${country.topLevelDomain[0]}
            </p>
            <p>
                <strong>Currencies:</strong>
                ${country.currencies.map(currency => currency.code)}
            </p>
            <p>
                <strong>Languages:</strong>
                ${country.languages.map(language => language.name)}
            </p>

        `;
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });


        searchEl.addEventListener('input', (e) => {
            const { value } = e.target;
            const countryName = document.querySelectorAll('.country-name');

            countryName.forEach( name => {
                if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
                    name.parentElement.parentElement.style.display = 'block';

                } else {
                    name.parentElement.parentElement.style.display = 'none';
                }
            });
        });


