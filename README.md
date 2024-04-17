![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

# Coming soon

_website design project_
<br>

## 🌟 About

This project is for educational porpuses only. Pull request are welcome, but priority for project authors! Thank you for your cooperation!

Site published at: https://jurgitae.github.io/flappy-bird-mobile/

Based on YT tutorial: [Build Side Scrolling Games with JavaScript](https://www.youtube.com/watch?v=vGRbs-HqBJE&t=5481s)

Improvements, changes and input implemented:

1. Bug fixes:

    - stop playing sound on controls when game is paused;
    - stop counting seconds when focus is lost (e.g. open other tab);
    - inconsistent controls fix: mouse and touch - same as one button press, while with key press-hold worked continuously (fixed);
    - mouse charge control implemented to enable full mouse controls;

2. Game intro page created with:

    - header
    - background
    - controls description
    - start game button and functionality in InputHandler class;

3. In-game buttons and functionalities:

    - R (restart)
    - P (pause)
    - soundOff/soundon
    - home screen
    - full screen

4. Add game levels:

    - implement endless obstacles instead of fixed number
    - increase speed;

5. UI improvements:

-   visible white max energy bar (white background bar to behind energy filled);
-   highest score implemented (using localStorage);
-   game over messages changed according to high score (best score beaten or not);

6. Code restructuring:

-   InputHandler class created and all interactions moved there;
-   UI class for drawing messages;
-   script.js cleaned;

## 🎯 Project features/goals

-   working with html canvas
-   vanilla js
-   make fully self-sufficient game from the basic given in the tutorial

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo
    ```sh
    git clone https://github.com/JurgitaE/flappy-bird-mobile.git
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
    or
    ```sh
    npm install
    ```
3. Run the server
    ```sh
    npm run dev
    ```

### 🧪 Running tests

There are no tests for this project.

## 🎅 Authors

Jurgita: [Github](https://github.com/JurgitaE)

## ⚠️ License

Distributed under the MIT License. See LICENSE for more information.

## 🔗 Other resources

No other resources
