export function createCountrySelection(container){
    const select = document.createElement('select');
    select.className = 'countries';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Seleccione un país';
    select.appendChild(defaultOption);

    fetch('./web/data/countries.json')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.text;
                option.dataset.shippingCost = country.shippingCost;
                option.textContent = country.text;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los países:', error);
        });

    select.addEventListener('change', () => {
        const selectedCountry = select.value;
        if (selectedCountry) {
            localStorage.setItem('country', selectedCountry);
        } else {
            alert('Por favor, selecciona un país antes de continuar.');
        }
    });

    container.appendChild(select);
}