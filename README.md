<h1 align="center">Country Quiz</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://country-quiz.islambeg.me/">
      Demo
    </a>
    <span> | </span>
    <a href="https://gitlab.com/islambeg-frontend-projects/frameworks-land/country-quiz">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8">
      Challenge
    </a>
  </h3>
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Overview

This application is a simple country quiz. Please see [Features](#features) section below for more details.

This was an interesting project to better learn Vue approach to frontend development
as the whole app is composed out of simple in themselves components.

I've also witnessed the benefits of using:

- Typescript as it helped to catch errors during development
- Pinia state manager as it helped to simplify components logic and keep most of mutations in one place

### Built With

- [REST Countries API](https://restcountries.com/)
- [Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Vite](vitejs.dev/)

## Features

The app is an infinite-length quiz with questions generated randomly from countries data provided by https://restcountries.com.

There are three types of question: for capitals, flags and populations.

While you are playing your current score, i.e. number of correct answers, is shown.

Quiz finishes after the first incorrect answer. It then shows you the score for the game just ended, your maximum all-time score and a button to restart the quiz.

Maximum score is persisted across site visits via `localStorage`.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://gitlab.com/islambeg-frontend-projects/frameworks-land/country-quiz

# Install dependencies
$ npm install

# Run dev app
$ npm run dev

# Build production version
npm run build

# Preview production app (when already built)
npm run preview
```

## Acknowledgements

- [Material Icons by Google](https://material.io/resources/icons/?style=round)
- [A modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/)
- [How to Favicon by Andrey Sitnik](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
- [Masonry style layout with CSS Grid](https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb)

## Contact

- Email islambeg@proton.me
- Gitlab [@islambeg](https://gitlab.com/islambeg)
