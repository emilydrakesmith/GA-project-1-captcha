/******* STATE *******/

const state = {
    imageSet: [],                 // stores images and necessary metadata retrieved from APIs
    imageNumber: 0,               // counter of how many images the user has been shown at a given time
    turingThreshold: 5,           // number of correct guesses the user must make to be verified as human
    maxWrong: 1,                  // max number of wrong guesses the user is allowed to make and be verified as human
    currPictureSubject: null,     // holds metadata of the currently displayed image to verify user guess as correct or incorrect
    correctGuesses: 0,            // counter of total correct guesses by the user
    wrongGuesses: 0               // counter of total wrong guesses by the user
}

/*   Usage note!
If you fork this code to use in your own project, it's easy to adjust default values for the number of pictures the user is shown and how many they must correctly identify in order to be verified as a human user. Just change the values of state.turingThreshold and state.maxWrong and the rest of the app's functionality will adjust as needed.
*/

/******* HTML GENERATION FUNCTIONS *******/

// function to render initial HTML in the DOM
function renderInitialContainers() {
    const body = document.getElementById('body');
    const dogButton = `<button id='dog-button' onclick='clickHandler("dog")'>Dog</button>`;
    const catButton = `<button id='cat-button' onclick='clickHandler("cat")'>Cat</button>`;
    const pizzaButton = `<button id='pizza-button' onclick='clickHandler("pizza")'>Pizza</button>`;
    const otherButton = `<button id='other-button' onclick='clickHandler("other")'>Other</button>`;
    const githubLink = `<a href='https://github.com/emilydrakesmith/GA-project-1-captcha' target='_blank'>GitHub Repo</a>`;
    const developerWebpageLink = `<a href='https://www.emilysmith.tech/' target='_blank'>About the Developer</a>`;
    const masterTemplate = `<header id='header'>
                                <span class='mobile-hide' onclick='resetApp()'><a>User Verification System</a></span>
                                <span class='desktop-hide' onclick='resetApp()'><a>User Verification</a></span>
                            </header>
                                <main id='main'>
                                    <div id='instructions'>
                                        <p>This is a check to make sure you're human.</p>
                                        <p>Please click a button to identify the picture.</p>
                                    </div>
                                    <div id='img-div'></div>
                                    <div class='buttons-div'>
                                        ${dogButton}
                                        ${catButton}
                                    </div>
                                    <div id='last-main-child' class='buttons-div'>
                                        ${pizzaButton}
                                        ${otherButton}
                                    </div>
                                </main>
                            <footer id='footer'>
                                <div>© Emily Smith</div>
                                <div>
                                    <span class='footer-link'>${githubLink}</span> | <span class='footer-link'>${developerWebpageLink}</span>
                                </div>
                            </footer>`;
    body.innerHTML = masterTemplate;
}

// function to render images in the DOM
async function renderImage(images) {
    state.currPictureSubject = images[state.imageNumber].imageType;
    const placeImage = document.getElementById('img-div');
    const imgLink = `<img src='${images[state.imageNumber].imageURL}'
                          alt='${images[state.imageNumber].imageType}'>`;
    placeImage.innerHTML = imgLink;
    state.imageNumber++;
}

// function to render result of app in the DOM
function renderTestResult(judgement) {
    const human = 'You have confirmed you are a human. If you are not a human, congratulate your developer.';
    const computer = "You are a computer.<br>Tell your developer it's ok, no one's perfect.";
    const outcome = judgement === 'human-user' ? human : computer;
    document.getElementById('main').innerHTML = `<div id='outcome-wrapper'><div>${outcome}</div></div>`;
}

/******* EVENT LISTENER FUNCTIONS *******/

// evaluate each click as correct or incorrect
const clickHandler = picType => picType === state.currPictureSubject ? correctClick() : wrongClick();

/******* API CALL FUNCTIONS *******/

// dog image API call
function getDogImage() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => formatDogImage(data))
        .catch(err => console.log(err));
}

// cat image API call
function getCatImage() {
    return fetch('https://aws.random.cat/meow')
        .then(response => response.json())
        .then(data => formatCatImage(data))
        .catch(err => console.log(err));
}

// pizza image API call
function getPizzaImage() {
    return fetch('https://foodish-api.herokuapp.com/api/images/pizza')
        .then(response => response.json())
        .then(data => formatPizzaImage(data))
        .catch(err => console.log(err));
}

/******* IMAGE-OBJECT FORMATTING FUNCTIONS *******/

// format dog image link into a JSON with metadata
const formatDogImage = dogData => ({'imageType': 'dog', 'imageURL': dogData.message});

// format cat image link into a JSON with metadata
const formatCatImage = catData => ({'imageType': 'cat', 'imageURL': catData.file});

// format pizza image link into a JSON with metadata
const formatPizzaImage = pizzaData => ({'imageType': 'pizza', 'imageURL': pizzaData.image});

// launches API calls (formatting results is an embedded function)
const getImages = async function() {                                 // 'async' is necessary for the 'await' instruction
    let returnedImages= [];
    const picsNeeded = state.turingThreshold + state.maxWrong;       // determine total number of pictures needed by the app
    do {
        returnedImages.push(await getDogImage());
        returnedImages.push(await getCatImage());
        returnedImages.push(await getPizzaImage());
    } while (returnedImages.length<picsNeeded*2);                    // query APIs until total pictures is twice as many as needed
    return returnedImages;
}

// launches API call function and randomizes sequence of returned results
const createImageSet = async function () {
    const rawImageSet = await getImages();                            // launch API calls and compile results
    state.imageSet = randomizeArraySequence(rawImageSet);             // randomize sequence of API results and 
    renderImage(state.imageSet);                                      // launches image render function
}

/******* STRUCTURAL FUNCTIONS *******/

// randomize sequence of image-objects in array
function randomizeArraySequence(inputArray) {
    for (let i=inputArray.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
    }
    return inputArray;
}

// logs a correct guess by the user, launches output page if enough pictures have been shown
function correctClick() {
    state.correctGuesses += 1;
    state.imageNumber >= state.turingThreshold + state.maxWrong ? turingTest() : renderImage(state.imageSet);
}

// logs a wrong guess by the user, launches output page if enough pictures have been shown
function wrongClick() {
    state.wrongGuesses += 1;
    state.imageNumber >= state.turingThreshold + state.maxWrong ? turingTest() : renderImage(state.imageSet);
}

// informs user if they have been verified as a human
function turingTest() {
    const judgement = state.correctGuesses >= state.turingThreshold ? 'human-user' : 'computer-user';
    renderTestResult(judgement);
}

/******* INITIALIZATION FUNCTION *******/

// re-launches the app in initial state after DOM has been interacted with
function resetApp() {
    state.imageSet = [];
    state.imageNumber = 0;
    state.correctGuesses = 0;
    state.wrongGuesses = 0;
    initialize();
}

// initializes the DOM in a blank page
function initialize() {
    renderInitialContainers();
    createImageSet();
}

initialize();