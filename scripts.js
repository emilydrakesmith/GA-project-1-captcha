const body = document.getElementById('body');

function renderInitialContainers() {
    body.insertAdjacentHTML('afterbegin', `<header id='header'></header>
                                           <main id='main'></main>
                                           <footer id='footer'></footer>`);
}

/******* API CALL FUNCTIONS *******/

function getDogImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

function getCatImage() {
    fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

function getPizzaImage() {
    fetch('https://foodish-api.herokuapp.com/api/images/pizza')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

/******* INITIALIZATION FUNCTION *******/

function initialize() {
    renderInitialContainers();
    getPizzaImage();
}

initialize();