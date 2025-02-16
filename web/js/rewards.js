import { createCountrySelection } from './countrySelector.js';
import {getUrl} from './urls.js';

// Determina y devuelve la ruta base adecuada para el pago
function getPaymentPagePath(){
    return window.location.pathname.includes('/html/')
                ? './fake-payment.html'
                : './html/fake-payment.html';
}

// Crea el botón de confirmación necesario al elegir el pais
function createConfirmButton(container, selectedReward) {
    const button = document.createElement('button');
    button.textContent = 'Confirmar';

    button.onclick = () => {
        const selectedCountry = container.querySelector('.countries').value;
        if (selectedCountry) {
            localStorage.setItem('rewardId', selectedReward);
            window.location.href = getUrl(getPaymentPagePath());
        } else {
            alert('Por favor, selecciona un país antes de continuar.');
        }
    };

    return button;
}

// Crea el párrafo para poner el texto "Costo de envío: ${shippingCost}€ + Contribución: ${contributionPrice}€ = Total: ${totalCost}€"
function createShippingCostMessage() {
    const message = document.createElement('p');
    message.id = 'shipping-cost-message';
    return message;
}

// Vincula a todos los botones la función correspondiente, si necesita envío al desplegable de paises y si no a la página de pago.
function initializeRewards() {
    const buttons = document.querySelectorAll('.contribute-button');

    buttons.forEach((button) => {
        const rewardDiv = button.closest('.reward'); //Busca en la jerarquia DOM el elemento con la clase más cercano
        const container = rewardDiv.querySelector('.country-container'); 
        if (!container) return;

        const requiresShipping = button.dataset.requiresShipping === 'true';

        if (requiresShipping) {
            createCountrySelection(container);
            const confirmButton = createConfirmButton(container, button.dataset.rewardId);
            const shippingMessage = createShippingCostMessage();

            container.appendChild(shippingMessage);
            container.appendChild(confirmButton);

            button.addEventListener('click', () => {
                button.hidden = true;
                container.hidden = false;

                const contributionPrice = parseFloat(button.dataset.price);
                const selectCountry = container.querySelector('.countries');

                selectCountry.addEventListener('change', () => {
                    const selectedOption = selectCountry.options[selectCountry.selectedIndex];
                    const shippingCost = parseFloat(selectedOption.dataset.shippingCost || 0);
                    const totalCost = contributionPrice + shippingCost;
                    shippingMessage.textContent = `Costo de envío: ${shippingCost}€ + Contribución: ${contributionPrice}€ = Total: ${totalCost}€`;
                });
            });
        } else {
            button.addEventListener('click', () => {
                localStorage.setItem('rewardId', button.dataset.rewardId);
                window.location.href = getUrl(getPaymentPagePath());
            });
        }
    });
}

// Crea la información visual de la recompensa, título, detalles, imagen...
function createRewardElement(reward, options = {}){
    const { includeImage = false, includeExtraInfo = false } = options;

    const article = document.createElement('article');
    article.classList.add('reward');

    // Título
    const title = document.createElement('h3');
    title.textContent = reward.title;
    article.appendChild(title);

    // Imagen (si está habilitada)
    if (includeImage && reward.imageURL) {
        const figure = document.createElement('figure');
        figure.classList.add('cart-image');

        const image = document.createElement('img');
        image.src = getUrl(`../src/${reward.imageURL}`);
        image.alt = reward.imageDescription;
        figure.appendChild(image);

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = reward.imageDescription;
        figure.appendChild(figcaption);

        article.appendChild(figure);
    }

    // Descripción
    const description = document.createElement('p');
    description.textContent = reward.description;
    article.appendChild(description);

    // Información adicional (si está habilitada)
    if (includeExtraInfo && reward.extraInfo) {
        const extraInfo = document.createElement('p');
        extraInfo.classList.add('extra-info');
        extraInfo.textContent = reward.extraInfo;
        article.appendChild(extraInfo);
    }

    // Botón
    const button = document.createElement('button');
    button.classList.add('contribute-button');
    button.textContent = `Contribuye con ${reward.price}€`;
    button.dataset.price = reward.price;
    button.dataset.rewardId = reward.rewardId;
    button.dataset.requiresShipping = reward.requiresShipping;
    article.appendChild(button);

    // Contenedor de país
    const countryContainer = document.createElement('div');
    countryContainer.classList.add('country-container');
    countryContainer.hidden = true;
    article.appendChild(countryContainer);

    return article;
}

// Permite crear dinámicamente la vista de las recompensas en función de la configuración elegida.
export function loadAndRenderRewards(url, options = {}) {
    fetch(getUrl(url))
        .then(response => response.json())
        .then(rewards => {
            const rewardsSection = document.querySelector('#rewards');
            rewardsSection.innerHTML = '';

            const h2 = document.createElement('h2');
            h2.textContent = 'Recompensas ficticias';
            rewardsSection.appendChild(h2);

            rewards.forEach(reward => {
                const rewardElement = createRewardElement(reward, options);
                rewardsSection.appendChild(rewardElement);
            });
        })
        .then(() => {
            initializeRewards();
        })
        .catch(error => {
            console.error('Error al cargar el archivo de recompensas:', error);
        });
}