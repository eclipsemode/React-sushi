# React sushi shop

SPA application with client-server architecture.

1. Authorisation / Registration. JWT. **`In Progress...`**
2. User's Personal account with previous orders and personal data. **`In Progress...`**
3. Administrator's panel (create / delete / update products, users, categories). **`In Progress...`**
4. Page with Product categories. **`In Progress...`**
5. Product sorting capability. **`In Progress...`**

## Used technologies

* React, Typescript
* Redux-toolkit
* SASS
* NodeJS, Express
* PostgreSQL

## Packages

    "@reduxjs/toolkit": "^1.8.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/jest": "^27.5.2",
    "@types/node": "^17.0.45",
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "@types/lodash.debounce": "^4.0.7",
    "@types/qs": "^6.9.7",
    "axios": "^0.27.2",
    "lodash.debounce": "^4.0.8",
    "qs": "^6.11.0",
    "react-content-loader": "^6.2.0",
    "react-icons": "^4.4.0",
    "react-router-dom": "^6.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.0.2",
    "react-scripts": "5.0.1",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4"

## Deploy

https://eclipsemode.github.io/React-sushi/

## Admin data

<pre>login: admin
password: 12345678</pre>

## UML Project

**`In Progress...`**

## UML Database

<div style="background: #fff; padding: 5px">
<img src="./server/models/sushi_diagram.drawio.png" alt="database_uml">
</div>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
