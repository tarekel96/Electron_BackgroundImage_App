# Electron_BackgroundImage_App

## About the Application
- This is a desktop screensaver application that is intended to be cross-platform for Mac and Windows. The application allows users to integrate their Instagram account with the application so they can use their IG posts as screensaver. 
- The application has a reddit search feature which allows users to search for different subreddit forums to pool images from and use as their screensaver. 
- The application was built using Electron.js, React.js, and Node.js (please refer to below for more details).

## Steps to Get Started:
        - 1) Install the latest version of npm globally on your computer: 
                https://docs.npmjs.com/cli/v6/commands/npm-install
                
        - 2) Install foreman globally with npm: npm install foreman -g

        - 3) Clone the repo in a directory would like to work in

        - 4) Install latest version of Yarn globally on your computer: 
                https://classic.yarnpkg.com/en/docs/install

        - 5) cd into the "screensaver-display" directory and type the command: yarn
        
        - 6) In the screensaver-display directory, start the settings application with this command: yarn settings
        
        - 7) Create and checkout your own branch. Convention: feature/developerInitials/featureWorkingOn(optional)
          -- a) git branch branchName   // create branch
          -- b) git checkout branchName  // checkout into own branch
        
        - 8) Push your local branch upstream to remote: git push -u origin branchName
        // this makes sure to track changes in your local repo to the remote repo

## Instagram Integration Instructions
- IG integration only available to accounts which accept a tester invite
- These users can: 
        - Login to their account and then get redirected to ScreenHero
        - Navigate to “IG Posts” and select the images want to use as screensavers
        - Change the settings under “Settings” and make sure to select “instagram”
        - Submit the settings form and close the success message
        - Click on Preview (side-navbar) to see the screensaver in action

- Diagram of Instagram integrations works: https://docs.google.com/drawings/d/10-ui9ZFTACxW4K2ZB38rnLoBY7ggXDEfqicSWN3sO4s/edit?usp=sharing
- *Note: Application does not replace native OS Screensaver Application automatically.
Manual Windows integration is currently possible via right-clicking the .scr executable file and clicking “Install.”
Automatic Windows integration is planned for the future.

## Reddit Search Instructions
- Reddit functionality is available to any user (does not require any login).
- All users can:
        - Navigate to the "Reddit Search" page and search for any subreddit
        - Upon searching, subreddit suggestions based on user input shall be populated on a dropdown underneath the search bar
        - User may select multiple subreddits for the app to pull images from for the screensaver
        - After clicking on a subreddit from the search bar dropdown, the subreddit tag will be populated at the bottom of the page
        - User can click on tag(s) to remove that subreddit from the screensaver's pool of images
        - Change the settings under "Settings" and make sure to select "reddit"
        - Submit the settings form and close the success message
        - Click on Preview (side-navbar) to see the screensaver in action

## How the Application was created
- Used Electron, a framework for running web apps as desktop apps
        - Ex: Spotify, VSCode, Slack, Discord
- Electron is built on node.js, which runs Javascript outside of a browser
- React is a popular front-end framework which can work with Electron
- git + Github for coordinating within the team
- Separate branches for different people and features
- Branches merged to combine the features
