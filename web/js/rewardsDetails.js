import { initializeRewards } from './rewards.js';

fetch('/web/data/rewards.json')
    .then(response => response.json())
    .then(rewards => {
        const rewardsSection = document.querySelector('#rewards');

        rewardsSection.innerHTML = '';
        
        const h2 = document.createElement('h2');
        h2.textContent = "Recompensas";
        rewardsSection.appendChild(h2);

        rewards.forEach(reward => {
            const article = document.createElement('article');
            article.classList.add('reward');

            const title = document.createElement('h3');
            title.textContent = reward.title;

            const description = document.createElement('p');
            description.textContent = reward.description;

            const button = document.createElement('button');
            button.classList.add('contribute-button');
            button.textContent = `Contribuye con ${reward.price}€`;
            button.dataset.price = reward.price;
            button.dataset.edition = reward.edition;
            button.dataset.requiresShipping = reward.requiresShipping;

            const countryContainer = document.createElement('div');
            countryContainer.classList.add('country-container');
            countryContainer.hidden = true;


            article.appendChild(title);
            article.appendChild(description);
            article.appendChild(button);
            article.appendChild(countryContainer);
            rewardsSection.appendChild(article);
        });
    })
    .then(() =>{
        initializeRewards();
    })
    .catch(error => {
        console.error('Error al cargar el archivo de recompensas:', error);
    });