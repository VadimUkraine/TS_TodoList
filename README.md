# TS_TodoList

Inside the project, you can run some built-in commands:

npm run start - runs the app in development mode.

Open http://localhost:4200 to view it in the browser.
The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

npm run test  - runs the test with Jest

npm run coverage  - runs the test with Jest and test coverage

npm run build - builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Also starts the plugin to show bundle size for production files.
Your app is ready to be deployed.

npm run stats - starts the plugin to show bundle size for static development files.

# About project structure

After working on several big projects I came up with the following folder structure:

src - main folder, containing the following folders: components, global, hoc, hooks, pages

components - contains common components that are used throughout the project and from which the main project pages are created

global  - here we store images, styles, video, audio files, api files, error handlers, utilities

hoc - here we store react hoc components

hooks - here we store custom react hooks

pages - contains files of project pages that consists from files of the following folders: components, global, hoc, hooks

In folder pages, each page has its own files concerning actions, sagas, constants, interfaces, reducer, utils that the specific page uses.
This is done in order not to run through all the files in some shared folder with actions to find a specific action/reducer. saga and so on.

Root saga and reducer moved to the folder level of src






