import { createCountrySelection } from './countrySelector.js';
import {getUrl} from './urls.js';

function linkPayment(container, selectedEdition){
    const select = container.querySelector('.countries');
    const button = document.createElement('button');
    button.textContent = 'Confirmar';
    button.onclick = () => {
        const selectedCountry = select.value;
        if (selectedCountry) {
            localStorage.setItem('edition', selectedEdition);
            window.location.href = getUrl('/html/fake-payment.html');
        } else {
            alert('Por favor, selecciona un país antes de continuar.');
        }
    };

    const shippingCostMessage = document.createElement('p');
    shippingCostMessage.id = 'shipping-cost-message';

    container.appendChild(shippingCostMessage);
    container.appendChild(button);
}


export function initializeRewards() {
    const containers = document.querySelectorAll('.country-container');
    const buttons = document.querySelectorAll('.contribute-button');
    
    buttons.forEach((button, index) => {
        const container = containers[index];
        if (!container) return;

        if(button.dataset.requiresShipping === 'true'){
            createCountrySelection(container);
            linkPayment(container, button.dataset.edition);

            button.addEventListener('click', () => {
            
                button.hidden = true;
                container.hidden = false;
    
                const shippingMessage = container.querySelector('#shipping-cost-message');
                shippingMessage.textContent = ''; 
                const contributionPrice = parseFloat(button.dataset.price); 
    
                const selectCountry = container.querySelector('.countries');
    
                selectCountry.addEventListener('change', () => {
                    const selectedOption = selectCountry.options[selectCountry.selectedIndex];
                    const shippingCost = parseFloat(selectedOption.dataset.shippingCost);
                    const totalCost = contributionPrice + shippingCost;
                    shippingMessage.textContent = `Costo de envío: ${shippingCost}€ + Contribución: ${contributionPrice}€ = Total: ${totalCost}€`;
                });
            });
        }
        else{
            button.addEventListener('click', () => {
                localStorage.setItem('edition', button.dataset.edition);
                window.location.href = getUrl('/html/fake-payment.html');
            });
        }
    });
}