Project: **websocket-remote-control**
https://github.com/nodejs/node-gyp#installation

Before install `robotjs`

## Please ensure you have the required dependencies before installing:

* Windows
  * windows-build-tools npm package (`npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe)
* Mac
  * Xcode Command Line Tools.
* Linux
  * Python (v2.7 recommended, v3.x.x is not supported).
  * make.
  * A C/C++ compiler like GCC.
  * libxtst-dev and libpng++-dev (`sudo apt-get install libxtst-dev libpng++-dev`).

Install node-gyp using npm:

```
npm install -g node-gyp
```

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8080` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8080` without nodemon

---

**All commands**

Command | Description
--- | ---
`npm run dev` | App served @ `http://localhost:8080` with nodemon
`npm run start` | App served @ `http://localhost:8080` without nodemon

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.