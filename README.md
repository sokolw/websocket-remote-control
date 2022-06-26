Project: **websocket-remote-control**
- `Use Node.js version: LTS 16.15.0`
- Written in Windows 10 Enterprise LTSC 2019

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

[robotjs info](https://github.com/octalmage/robotjs)

## Installation
1. Clone/download repo
2. `npm i`

## Usage
**Development**

`npm run start:dev` 
* with `nodemon`
* Socket server served @ `http://localhost:8080`
* Static server served @ `http://localhost:5000`

**Production**

`npm run start`

* without `nodemon`
* Socket server served @ `http://localhost:8080`
* Static server served @ `http://localhost:5000`

---

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.