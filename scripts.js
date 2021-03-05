/******* STATE *******/

const state = {
    imageSet: [],
    imageNumber: 0,
    turingThreshold: 5,           // value + 1 must be a number evenly divisible by the number of APIs queried
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
    state.currPictureSubject = imageSet[state.imageNumber].imageType;
    console.log(state.currPictureSubject)
    const main = document.getElementById('img-div');
    main.innerHTML = `<img src='${imageSet[state.imageNumber].imageURL}' alt='${imageSet[state.imageNumber].imageType}'>`;
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

const formatDogImage = dogData => ({'imageType': 'dog', 'imageURL': dogData.message});

const formatCatImage = catData => ({'imageType': 'cat', 'imageURL': catData.file});

const formatPizzaImage = pizzaData => ({'imageType': 'pizza', 'imageURL': pizzaData.image});

const createImageSet = async function() {                           // 'async' is necessary for the 'await' instruction
    let imageSet= [];
    for (let i=0; i<(state.turingThreshold+1)/3; i++) {                                       // trigger API calls with waits
        imageSet.push(await getDogImage());
        imageSet.push(await getCatImage());
        imageSet.push(await getPizzaImage());
    }
    for (let i=imageSet.length-1; i>0; i--) {                       //randomize sequence of image-objects in array
        const j = Math.floor(Math.random() * (i+1));
        [imageSet[i], imageSet[j]] = [imageSet[j], imageSet[i]];
    }
    console.log(imageSet)
    imageSet.forEach(item => console.log(item));
    state.imageSet = imageSet;
    renderImage(state.imageSet);
}

/******* STRUCTURAL FUNCTIONS *******/

function correctClick() {
    state.correctGuesses += 1;
    console.log(`Correct guesses: ${state.correctGuesses}`);
    state.imageNumber === state.imageSet.length ? turingTest() : renderImage(state.imageSet);
}

function wrongClick() {
    state.wrongGuesses += 1;
    console.log(`Wrong guesses: ${state.wrongGuesses}`);
    state.imageNumber === state.imageSet.length ? turingTest() : renderImage(state.imageSet);
}

function turingTest() {
    console.log('jocomo fe na ne');
    const human = 'You have confirmed you are a human.';
    const computer = "You are a computer.<br>Tell your developer it's ok, no one's perfect.";
    const outcome = state.correctGuesses >= 5 ? human : computer;
    document.getElementById('main').innerHTML = outcome;
}

/******* INITIALIZATION FUNCTION *******/

function initialize() {
    renderInitialContainers();
    createImageSet();
}

initialize();