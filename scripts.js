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
    const githubLink = ``;
    body.innerHTML =   `<header id='header'>
                            <span class='mobile-hide'>User Verification System</span>
                            <span class='desktop-hide'>User Verification</span>
                        </header>
                        <main id='main'>
                            <div id='instructions'>
                                <p>This is a check to make sure you're human.</p>
                                <p>Please click a button to identify the picture.</p>
                            </div>
                            <div id='img-div'></div>
                            <div class='buttons-div'>
                                <button id='dog-button' onclick='clickHandler("dog")'>Dog</button>
                                <button id='cat-button' onclick='clickHandler("cat")'>Cat</button>
                            </div>
                            <div id='last-main-child' class='buttons-div'>
                                <button id='pizza-button' onclick='clickHandler("pizza")'>Pizza</button>
                                <button id='other-button' onclick='clickHandler("other")'>Other</button>
                            </div>
                        </main>
                        <footer id='footer'>
                            <div>© Marty Smith</div>
                            <div>
                                <span class='footer-link'>
                                    <a href='https://github.com/mhsmith321/GA-project-1-captcha' target='_blank'>GitHub Repo</a>
                                </span> | <span class='footer-link'>
                                    <a href='https://martysmith.tech/' target='_blank'>About the Developer</a>
                                </span>
                            </div>
                        </footer>`;
}

async function renderImage(images) {
    state.currPictureSubject = images[state.imageNumber].imageType;
    const placeImage = document.getElementById('img-div');
    const imgLink = `<img src='${images[state.imageNumber].imageURL}'
                          alt='${images[state.imageNumber].imageType}'>`;
    placeImage.innerHTML = imgLink;
    state.imageNumber++;
}

/******* EVENT LISTENER FUNCTIONS *******/

const clickHandler = picType => picType === state.currPictureSubject ? correctClick() : wrongClick();

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

const getImages = async function() {                           // 'async' is necessary for the 'await' instruction
    let returnedImages= [];
    for (let i=0; i<(state.turingThreshold+1)/3; i++) {               // trigger API calls with waits
        returnedImages.push(await getDogImage());
        returnedImages.push(await getCatImage());
        returnedImages.push(await getPizzaImage());
    }
    return returnedImages;
}

const createImageSet = async function () {
    const rawImageSet = await getImages();                            // launch API calls and compile results
    state.imageSet = randomizeArraySequence(rawImageSet);             // randomize sequence of API results and 
    renderImage(state.imageSet);                                      // launches image render function
}

/******* STRUCTURAL FUNCTIONS *******/

function randomizeArraySequence(inputArray) {
    for (let i=inputArray.length-1; i>0; i--) {                                // randomize sequence of image-objects in array
        const j = Math.floor(Math.random() * (i+1));
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
    }
    return inputArray;
}

function correctClick() {
    state.correctGuesses += 1;
    state.imageNumber > state.turingThreshold ? turingTest() : renderImage(state.imageSet);
}

function wrongClick() {
    state.wrongGuesses += 1;
    state.imageNumber > state.turingThreshold ? turingTest() : renderImage(state.imageSet);
}

function turingTest() {
    const human = 'You have confirmed you are a human. If you are not a human, congratulate your developer.';
    const computer = "You are a computer.<br>Tell your developer it's ok, no one's perfect.";
    console.log(state.turingThreshold)
    const outcome = state.correctGuesses >= state.turingThreshold ? human : computer;
    document.getElementById('main').innerHTML = `<div id='outcome-wrapper'><div>${outcome}</div></div>`;
}

/******* INITIALIZATION FUNCTION *******/

function initialize() {
    renderInitialContainers();
    createImageSet();
}

initialize();