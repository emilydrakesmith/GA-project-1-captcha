# Introduction

This app is for a basic CAPTCHA-style program to verify the end-user is a human rather than a bot.  It can also be utilized for machine learning applications related to picture recognition.

This project is Unit 1 end assignment from General Assembly's Software Engineering Immersive program.

# Instructions for Use

### Methodology

The user starts on a page with a random picture of either a dog, a car, or pizza.  Next to the image are four buttons:

1. Dog
2. Cat
3. Pizza
4. Other

The user clicks a the button matching the subject of the image.  When this happens the image will be shown a new image which and repeat the process.  After the user attempts to identify the subject of six images they'll be given a report based on their success.

**Success**  If the user successfully identifies the subject in at least 5 of the 6 images they'll be congratulated as either a human or a computer program developed by an engineer with strong skills in machine learning.

**Failure**  If the user fails to successfully identify the subject in at least 5 of the 6 images they'll be informed they are likely a computer and console the engineer about its performance.

### Usage Notes

* A number of features in the program were implemented to prevent reasoned guessing at the subject of the image without being able to identify it visually.
  * The API results will appear in a randomized sequence.  There is no correlation between the subject of one image and the next.
  * The APIs will be queried for twice as many pictures as the user will be shown.  Correct answers will not be evenly distributed between the three categories.
  * All pictures are of dogs, cats, or pizza.  The *Other* button will never be the correct button short of either more API calls being implemented at a later date or one of the APIs erroneously supplying an off-theme image.  The developer looked at several hundred images and did not find any such images.
  * The user is not informed how many guesses they have made correctly or incorrectly.  The app will also show 6 images in total even if the user reaches the threshold of incorrect answers to trigger failure.
* This is a mobile-responsive app although the mobile and desktop/tablet versions are functionally identical.  The only differences are minor stylistic changes related to maintaining a reasonable size and scale for a smaller screen. Please See *Appendix B: Product Screenshots* for further information.

# Version Notes

The **1.0.2** version of this app is currently uploaded.  In cases where I update the README without any updates to the website itself I do not update the version number or use branches for my work.  Each version number will lack a commit number until the next version is uploaded.  The current commit number is always added retroactively.  In general, for version number format X.Y.Z:

* X: increases in this number represent a complete overhaul of some section of the website, source code, or UI
* Y: increases in this number represent a major functional change/aesthetic change or addition to the app
* Z: increases in this number represent changes that are relatively minor but still warrant a new commit

Version 0.1.0 is the first version with the full range of intended functions successfully implemented.  Version 1.0.0 is the first to be both full functional and styled.

#### v 0.0.1 | 04 March 2021 | commit c2fd1e8b40cc31e1aa6d16be0b3614aa4cd97e9b | Initial Commit
* Set up boilerplate HTML in `index.html`.
* Linked `styles.css` and `scripts.js` to `index.html`.

#### v 0.0.2 | 04 March 2021 | commit 4c6d86f9375793ce0239111538cfe7d6e472d510
* Created basic HTML containers.
* API calls are set up and returning positive results.

#### v 0.0.3 | 04 March 2021 | commit 9445f6af20eeaed06ccc1f3b1e20957bb646b259
* API results are being formatted into JSONs and populated into an array in state appropriate for use by the app.
* Sequence of API results in the results array is now randomized.

#### v 0.0.4 | 04 March 2021 | commit acbc7be8ddbfd1b3f2d49ea57ff44f499b65159b
* First picture in the API results array is rendering.
* Buttons are rendered.

#### v 0.0.5 | 04 March 2021 | commit d10a9dbfdf1b0cb399a5ed49c814865b6abef325
* Created click handlers and attached them to buttons.

#### v 0.0.6 | 04 March 2021 | commit 27008ddb621f7103eca827a0b107b3a197e0cc93
* App is applying logic to determine if button clicks are correct or incorrect.

#### v 0.0.7 | 04 March 2021 | commit 5abc99a1bada7a96ac6a3378f2aaee84a3d1da68
* No significant changes.  I accidentally made a commit in this directory while working on a different project. Oops.

#### v 0.0.8 | 05 March 2021 | commit 2ee7208104c15c45f4072d72af7edf4e8ac029d2
* App now loops through every picture in the array.
* Created remote repository on GitHub and pushed code.

#### v 0.1.0 | 05 March 2021 | commit d29074c205883fda82de09123393260e24f717f5
* App displays results of Turing test once all pictures have been looped.
* Basic functionality is complete (needs additional work before initial deployment).

#### v 0.1.1 | 05 March 2021 | commit 420e30d9897a58d25ffcbebbf93b23f91ccbaf10
* Built out `README.md`.
* Increased the number of API calls made by the app to increase picture set randomization.
* Added custom fonts.
* Worked on object centering and spacing.
* Added an instructions box.
* Implemented a color scheme.

#### v 0.1.2 | 05 March 2021 | commit 927a7017b3ed04e46d31a08f567044a36157225c
* Buttons highlight with an outline on mouse hover.

#### v 1.0.0 | 07 March 2021 | commit eb4a7ae64cb8f456e367eaf7c55dbad40a29075c
* App is styled, optimized, functional, and ready for deployment.
* Fixed vertical spacing issues.
* Added `<header>` and `<footer>` sections.
* Refactored code for several improvements.
  * Better separation of concerns.
  * Reduced functions to one-liners where feasible.
  * Functions only run asynchronously when necessary.
* Added mobile-device responsiveness.
* Added screenshots of product variants and wireframe mockup to `README.md` file.

#### v 1.0.1 | 07 March 2021 | commit 37c7a67bb17632ba1ad0a83bf29f2f280aab2332
* Fixed mis-labeled images in `README.md` file.

#### v 1.0.2 | 08 March 2021 | commit -- | Current Version
* Refactored `getImages()` to run with a `do...while` loop instead of a `for` loop. The `while` condition runs API queries a number of times relative to `state.turingThreshold`.  This will increase stability by reducing the chance someone else forks and uses the app and changes values to produce an insufficient number of images compared to `state.turingThreshold` for the app to work.
* Refactored user-interactable elements (all `<a>` elements and hyperlinks) out of template HTML and into variables.  Variables are then injected into HTML template literals.

# Tech Framework

### This app uses:
* HTML5 and CSS
* JavaScript ES6

### I built this app with:
* [VSCode](https://code.visualstudio.com/) version 1.53.2
* [Google Chrome](https://www.google.com/chrome/) version 88.0.4324.192 (Official Build) (arm64)
* [Homebrew](https://brew.sh/) 3.0.2
* Zsh 5.8 with [Oh My Zsh](https://ohmyz.sh/)
* [GitHub](https://github.com/) (online, not desktop)
* macOS Big Sur version 11.2.1, Apple M1 chip

### This app is hosted at:
* [GitHub Repo](https://github.com/mhsmith321/GA-project-1-captcha)
* [GitHub Hosted Site](https://mhsmith321.github.io/GA-project-1-captcha/)

# APIs

### Dog API
Dog images were supplied by the [Dog API](https://dog.ceo/dog-api/). This API is free, open-source, and does not require authentication. The [Dog API welcomes your support](https://dog.ceo/dog-api/about) to help it continue providing its services.

### random.cat API
Cat images were supplied by the [random.cat API](https://aws.random.cat/). This API is free, open-source, and does not require authentication. You can support the random.cat API at the prior link to help it continue providing its services.

### Foodish API
Pizza images were supplied by the [Foodish API](https://github.com/surhud004/Foodish#readme). This API is free, open-source, and does not require authentication. You can [support Foodish](https://github.com/surhud004/Foodish/blob/master/CONTRIBUTING.md) to help it continue providing its services.

# Future Plans

* Refactor the code to exist entirely within JSON to increase modularity.

# Contribute

Although I'm always interested in meeting new collaborators I prefer to keep this an individual project as a skills demonstrator.

I'm happy to let anyone reuse my code so long as you contact me for advance permission and give attribution where appropriate.  Some materials are specified in this README as proprietary material from General Assembly and should only be used with the direct permission of General Assembly.

If you'd like to learn more about the developer, please visit [my website](https://martysmith.tech/) and [my GitHub](https://github.com/mhsmith321).

# Special Thanks

* Instructors and peers from the General Assembly SEIR-EC-2-22 cohort for collaboration in developing this app. While this app represents my own original work we gave each other assistance in developing our own versions thereof.

* All the APIs used in this app were found through [public-apis](https://github.com/public-apis/public-apis), published by the [Public APIs Project](https://github.com/public-apis).  All the APIs are free, open source, and do not require authentication.  Please refer to the 

* Formatting this `README.md` file was easy with the help of the [Markdown Live Preview](https://markdownlivepreview.com/) tool.

* I found the font [Poppins](https://fonts.google.com/specimen/Poppins) through [Google Fonts](https://fonts.google.com/).  It was created by [Jonny Pinhorn](https://github.com/jonpinhorn) and the [Indian Type Foundry](https://www.indiantypefoundry.com/) and made available for use through the [SIL Open Font License](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL).

* The color palette was developed with the help of [Coolors.co](https://coolors.co/) and tested for accessibility with [Color Safe](http://colorsafe.co/).

* I used [Whimsical](https://whimsical.com/wireframes) to generate the wireframe images seen in *Appendix B: Product Screenshots & Images*.

# Appendices

## Appendix A: Unit 1 Project Assignment from General Assembly

Information in this section was reproduced with the permission of General Assembly.  Please do not copy or republish without the direct permission from General Assembly to do so.

### Overview

Your first SEI project will be something cool - **an app that makes API calls!**

Everyone will get a chance to **be creative** and work through some **tough programming challenges**. You got your feet wet with Tic-Tac-Toe, and we built the guessing game during class and the YeTay App we coded together in class - now it’s time to step it up a notch.

**You will be working individually on this project**.

As a reminder, GA has a zero-plagiarism policy - your project’s code **must be substantially yours**. **Do not copy code from similar projects or other sources**. However, using code from StackOverflow to accomplish general techniques/algorithms is okay - for example, a line of code that replaces a character at a specific position in a string.

### Presentation

You will have an **absolute maximum of 8 minutes** to present your project following these guidelines:

1. **Introduce the Project:**

  * Intro your app by paraphrasing the README.

2. **Demonstrate the Project:**

  * Launch the app by clicking the link in the README.

  * Demonstrate the app!

3. **Show/discuss your code:**

  * Briefly show the HTML & CSS.

  * Show the JavaScript and discuss your favorite function.

4. **Share the experience:**

  * What was your biggest challenge?

  * What are your key learnings/takeaways?

**Q & A + Feedback** may also follow your presentation but is not part of the time structure.

How you structure your presentation is ultimately up to you as long as you cover the above points, but others have found success by following the above order and spending a roughly equal amount of time speaking to the above 4 points.

### Technical Requirements

**Your App MUST:**

* **Render an application in the browser**.

* **Use either Bootstrap, Materialize, or your own custom, well-styled CSS**.

* **Include at least two (2) APIs with different endpoints**

* Include separate HTML, CSS & JavaScript files.

* Have **properly indented HTML, CSS & JavaScript**. Additionally, vertical whitespace needs to be consistent.

* No remaining **dead or commented out code** (code never called).

* Have functions and variables that are named sensibly. Remember, functions should typically be verbs and variables (data) named as nouns.

* **Have consistent code choices**. For example, choose between your preference for function declarations vs. function expressions.

* **Be deployed online** so that the rest of the world can use it!

### Necessary Deliverables

* The code for **a working application that meets or exceeds the above technical requirements, built by you, and hosted on the internet** (covered next week).

* **A `README.md` file** with these sections:

  * **<Your app’s title>**: A description of your app. What was your inspiration?

  * **Getting Started**: Include a link to your deployed app and any instructions you deem important.

  * **Screenshot(s):** Images of your actual app.

  * **Technologies Used**: List of the technologies used, e.g., JavaScript, HTML, CSS…

  * **Next Steps**: Planned future enhancements (icebox items).

    *  Don’t underestimate the value of a well crafted README.md. The README.md introduces your project to prospective employers and forms their first impression of your work!

* **Frequent commits that date back to the very beginning of the project**. Never delete your repo to “start over”. Commit messages should be in the present tense. **Be sure to create the repo on your personal GitHub account and ensure that it is public.**

### Suggestions

* **Theme your app** to give it a more personal touch and make it more unique!

* **Use your Development Tools** (Chrome DevTools rock!) to debug and solve issues.

* Please keep it simple. Minimum Viable Product (MVP) functionality that looks great is better than extra functionality added to an app without polish.

* Review and check the [Project 1 Code Review](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4b040483-1496-49c4-8c5f-9ed5a261b812/U1_API_Code_Review.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210301T164643Z&X-Amz-Expires=86400&X-Amz-Signature=e577eba71a2d57a441ac33f2d32d9108f2190c548a54a9b7f6437ff84dcac5e9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22API%2520Code%2520Review.pdf%22) regularly to ensure that your project will meet the minimum requirements.

* **Consult documentation and other resources** to understand methods, etc.

* Write **DRY (Don’t Repeat Yourself)** code. Check for repeating code and refactor into functions that accept arguments.

## Appendix B: Product Screenshots & Images

### Desktop Variant

![Desktop Variant Screenshot](images/desktop-screenshot.png)

### Mobile Variant

![Mobile Variant Screenshot](images/mobile-screenshot.png)

### Wireframe Mockup

![Wireframe Mockup](images/wireframe-mockup.png)