# **Screensaver Display Application**

# Environment Guide:
TL;DR:
- don't use `npm`, use `yarn` instead!
- put app source files in `src/`
- build with `yarn build-[windows/mac/linux]`

## Environment Tools
##### Yarn
Yarn is a package manager. npm is also a package manager. Yarn was created by facebook and is much faster. Therefore, ever use `npm`, only use `yarn` in commandline. If we use both, there will be package tracking inconsistencies. Yarn can do everything that npm can, including running scripts

##### electron-packager
Simple enough, packages our app into a runnable build. Taken from the [Deploying Electron Doc](https://docs.google.com/document/d/1tiM02S2GJ73rOFmg_y9Lo0v9LmL-DD4MgYAHfn0mbe4/edit) we now have scripts to build our app without having to type as much:
`yarn build-windows`
`yarn build-mac`
`yarn build-linux`

##### React.js

## Directory Resources

##### .gitignore
File that contains all the paths that github should ignore. By default, we should all ignore `node_modules/` and `release_builds/`

##### node_modules
Folder that contains all the modules needed for the program. This folder is huge, and we should be ignoring it in `.gitignore`

##### yarn.lock
File that contains a list of all packaged and modules we need. Instead of sending each other modules, we will instead send a list of modules that Yarn will download

##### package.json
File that contains information for npm. Most important here is `"scripts"`, where you can assign a script to run a command. For example, I created a script to run the deployment procedures for a Windows build which can be activated through Yarn with `yarn build-windows`

##### src/ and public/
`src/` and `public/` will be folders that hold the main content of our apps. `public/` contains files that are sent to the user when they access a website. `src/` contains working files for the app. That means we should only necessarily need the `src/` folder for electron apps