# justaportfolio
Just a portfolio web app

## Intro
This project is a simple npm application, using express as the server-side framework, and only bootstrap + css on the front end. All animations and transitions were done purely with css.

## How to run
0. Make sure you have npm installed.
1. Run `npm install` to install necessary dependencies.
2. Run `npm start` to start a local instance of your server. You can check it out at `localhost:3000`.
3. Run `npm install --also=dev` to install necessary dependencies for the building process.
4. Run `npm run build` to build through webpack. It will create a dist folder with minified css.

OBS: I noticed that the command `npm build` since 2019 has since changed, so the command to execute the 'build' script in package.json is now `npm run build`.
