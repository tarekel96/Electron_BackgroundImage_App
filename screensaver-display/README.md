# **Screensaver Display Application**

# Updates:
- Now build an installation file with `yarn build` (builds deployment for whatever OS you are on)
- React should now run correctly on all Operating Systems, whereas before Electron would run without React instance. Run Electron with `yarn start`
- Electron now loads `http://localhost:3000` during development and loads `public/index.html` in deployed builds 

# Environment Guide:
TL;DR:
- don't use `npm`, use `yarn` instead!
- put app source files in `src/`
- build installation file with `yarn build` for all Operating Systems!

## Environment Tools
##### Yarn
Yarn is a package manager. npm is also a package manager. Yarn was created by facebook and is much faster. Therefore, ever use `npm`, only use `yarn` in commandline. If we use both, there will be package tracking inconsistencies. Yarn can do everything that npm can, including running scripts

##### electron-builder
Condensed version of deployment from electron-builder that instead builds an installation file for the program
`yarn build`

## Directory Resources

##### .gitignore
File that contains all the paths that github should ignore. By default, we should all ignore `node_modules/` and `release_builds/`

##### node_modules
Folder that contains all the modules needed for the program. This folder is huge, and we should be ignoring it in `.gitignore`

##### yarn.lock
File that contains a list of all packaged and modules we need. Instead of sending each other modules, we will instead send a list of modules that Yarn will download

##### package.json
File that contains information for npm. Most important here is `"scripts"`, where you can assign a script to run a command. For example, I created a script to run the deployment procedures for ~~a Windows build~~ ALL builds which can be activated with `yarn build`