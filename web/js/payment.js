import {getUrl} from './urls.js';
import { FundStorage } from './fundStorage.js';

let rewardPrice = 0;
let shipmentPrice = 0;
let supplementPrice = 0;
const totalCost = document.querySelector("#total-cost");

fetch(getUrl('../data/rewards.json'))
    .then(response => response.json())
    .then(rewards => {

        const rewardId = localStorage.getItem("rewardId");

        rewards.forEach(reward => {
            if(reward.rewardId == rewardId){

                const rewardName = document.querySelector("#reward-name");
                rewardName.textContent = reward.title;
                
                rewardPrice = reward.price;
                const rewardCost = document.querySelector("#rewards-cost");
                rewardCost.textContent = rewardPrice;

                const shippingCountry = document.querySelector("#shipping-country");
                const shippingCost = document.querySelector("#shipping-cost");

                const figure = document.querySelector(".cart-image");
                figure.innerHTML = '';
                const image = document.createElement('img');
                image.src = reward.imageURL;
                image.alt = reward.imageDescription;
                figure.appendChild(image);
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = reward.imageDescription;
                figure.appendChild(figcaption);

                if (reward.requiresShipping){
                    shippingCountry.textContent = localStorage.getItem("country");
                    fetch(getUrl('../data/countries.json'))
                    .then(response2 => response2.json())
                    .then(countries => {
                        const searchedCountry = localStorage.getItem("country");
                        countries.forEach(country => {
                            if(country.text === searchedCountry){
                                shippingCost.textContent = country.shippingCost;
                                shipmentPrice = country.shippingCost;
                                totalCost.textContent = shipmentPrice + rewardPrice;
                            }
                        });
                    })
                } else{
                    shippingCountry.textContent = "No necesario";
                    shippingCost.textContent = "Gratis";
                    totalCost.textContent = rewardPrice;
                }
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo de recompensas:', error);
    });

const extraSupportInput = document.querySelector("#extra-support");

extraSupportInput.addEventListener("input", (event) => {
    supplementPrice = parseInt(event.target.value);
    totalCost.textContent = shipmentPrice + rewardPrice + supplementPrice;
});

const form = document.getElementById('payment-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const mail = document.getElementById('name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiredDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    const fund = new FundStorage();
    fund.addAmount(rewardPrice + supplementPrice);

    alert("¡Muchas gracias por su contribución!");
    window.location.href = getUrl('../index.html');
    
    // Limpiar los campos del formulario
    form.reset();
});