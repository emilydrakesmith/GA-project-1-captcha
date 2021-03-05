/******* STATE *******/

const state = {
    imageNumber: 0,
    currPictureSubject: null,
    correctGuesses: 0,
    wrongGuesses: 0
}

/******* HTML GENERATION FUNCTIONS *******/

function renderInitialContainers() {
    const body = document.getElementById('body');
    body.innerHTML =   `<header id='header'></header>
                        <main id='main'>
                            <div id='img-div'></div>
                            <div id='buttons-div'>
                                <button id='dog-button' onclick='clickHandler("dog")'>Dog</button>
                                <button id='cat-button' onclick='clickHandler("cat")'>Cat</button>
                                <button id='pizza-button' onclick='clickHandler("pizza")'>Pizza</button>
                                <button id='other-button' onclick='clickHandler("other")'>Other</button>
                            </div>
                        </main>
                        <footer id='footer'></footer>`;
}

// need to add an index parameter so we can keep loading new pictures after the click handler is triggered
async function renderImage(images) {
    console.log(state.imageNumber);
    imageSet = await images;
    state.currPictureSubject = imageSet[state.imageNumber].type;
    console.log(state.currPictureSubject)
    const main = document.getElementById('img-div');
    main.innerHTML = `<img src='${imageSet[state.imageNumber].imageURL}' alt='${imageSet[state.imageNumber].type}'>`;
    state.imageNumber++;
}

/******* EVENT LISTENER FUNCTIONS *******/

function clickHandler(imageSubject) {
    console.log(imageSubject);
    imageSubject === state.currPictureSubject ? correctClick() : wrongClick();
}

/******* API CALL FUNCTIONS *******/

function getDogImage() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => formatDogImage(data))
        .catch(err => console.log(err));
}

function getCatImage() {
    return fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(data => formatCatImage(data))
        .catch(err => console.log(err));
}

function getPizzaImage() {
    return fetch('https://foodish-api.herokuapp.com/api/images/pizza')
        .then(response => response.json())
        .then(data => formatPizzaImage(data))
        .catch(err => console.log(err));
}

/******* IMAGE-OBJECT FORMATTING FUNCTIONS *******/

const formatDogImage = dogData => ({'type': 'dog', 'imageURL': dogData.message});

const formatCatImage = catData => ({'type': 'cat', 'imageURL': catData.file});

const formatPizzaImage = pizzaData => ({'type': 'pizza', 'imageURL': pizzaData.image});

const createImageSet = async function() {
    let imageSet= [];
    for (let i=0; i<2; i++) {
        imageSet.push(await getDogImage());
        imageSet.push(await getCatImage());
        imageSet.push(await getPizzaImage());
    }
    for (let i=imageSet.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [imageSet[i], imageSet[j]] = [imageSet[j], imageSet[i]];
    }
    console.log(imageSet)
    imageSet.forEach(item => console.log(item));
    return imageSet;
}

/******* STRUCTURAL FUNCTIONS *******/

function correctClick() {
    state.correctGuesses += 1;
    console.log(`Correct guesses: ${state.correctGuesses}`);
}

function wrongClick() {
    state.wrongGuesses += 1;
    console.log(`Wrong guesses: ${state.wrongGuesses}`);
}

/******* INITIALIZATION FUNCTION *******/

function initialize() {
    renderInitialContainers();
    renderImage(createImageSet());
}

initialize();