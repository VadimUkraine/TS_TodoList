# TS_TodoList

Inside the project, you can run some built-in commands:

npm run start - runs the app in development mode.

Open http://localhost:4200 to view it in the browser.
The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

npm run test  - runs the test with Jest

npm run coverage  - runs the test with Jest and test coverage

npm run build - builds the app for production to the build folder. The eslinter is also launched. If there are errors in the code, the build will not be assembled. The build is minified and the filenames include the hashes. Also starts the plugin to show bundle size for production files. Your app is ready to be deployed.

npm run stats - starts the plugin to show bundle size for static development files.

npm run eslint - starts the plugin eslint to find errors and warnings on the whole project

pre-commit - husky plugin is installed. If you try to do a commit - the plugin starts the plugin lint-staged, which will check the code for errors. If there are errors - commit be failed.
