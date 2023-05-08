# Wikipedia Monitor

## Technnologies

<p align="center">
  <img src="https://img.shields.io/badge/WebSocket-FFFF00?style=for-the-badge&logo=websocket"/>
  <img src="https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white"/>
</p>


## Overview

This project is a web-based application built on WebSocket, ReactJS, D3, and Material UI to display real-time updates of the activity feed data received from [Hatnote WebSocket connection](ws://wikimon.hatnote.com:9000) . 

All data is presented in real-time. 

The project includes 
* A world map created with D3 that highlights countries of the user.
* A table counts edit from each country.
* A Scrollable feed of all the action in human readable format.
* A table that shows count by each action type.

## Dependencies 

Please check the [package.json](package.json) for all dependencies

## Components

* [**GetWebsocketData**](./src/components/GetWebsocketData/index.js): Connects to WebSocket `ws://wikimon.hatnote.com:9000` and sets the data to the react state.
* [**ActivityFeed**](./src/components/ActivityFeed/index.js) Shows real-time updates of the activity feed data received from the `GetWebsocketData`'s React state.
* [**ActionCount**](./src/components/ActionCount/index.js) Creates two table that shows counts by 
    * Country Name
    * Action type.
* [**GeoChart**](/src/components/GeoChart/index.js) Renders a world map, using [D3](https://d3js.org/). It reads the `geo_ip` field in the data and highlights the country from where the action is performed in real time.


## Folder Structure
The folder structure of this project is organized as follows:

```
    /
    public/
    index.html
    src/
    App.js
    index.js
    App.css
    components/
        ActionCount
        GeoChart
        GetWebscoketData
        ActivityFeed
    styles/
        App.css
```

## Installation

To run this project locally, follow these steps:

Open terminal, and clone the repository by entering 
```
$ git clone https://github.com/NikkiKumari/wikki-feeds
```

Ensure that NodeJS and npm are installed on the system.
```bash
$ node --version
v16.13.0
$ npm --version
8.1.0
```
Install the dependencies using, from `package.json`
```
$ npm install
```
Start the project : 
```
$ npm start
```
Project should be accessible at : http://localhost:3000 


## Example 
![Animation](https://user-images.githubusercontent.com/24254561/236946815-4fe09226-6b0b-4b4f-aa93-d7d5c0d250b6.gif)
