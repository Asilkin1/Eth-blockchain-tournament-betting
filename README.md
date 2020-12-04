# ETH-BET tournament betting

## Description
Users can bet on various tournaments for different professional esports. For the time we have to develop this application and the fact that the API has a monthly cost, it will be limited to the sample JSON files of past and future tournaments given by the API for free for development.

## Getting started

### Install
1. node.js - https://nodejs.dev/
2. truffle - ```npm install truffle -g```
3. ganache - https://www.trufflesuite.com/ganache
4. run npm install from the project folder to install everyhting from node_modules folder

### Run
1. Start ganache/ganache-cli (This is a personal ethereum blockchain)
2. go to projects /contract folder where truffle-config.js file is placed. (Here we set up deployment options)
3. run ```truffle migrate --network development``` to deploy a contract to development network
4. copy contract address and replace a variable ```contractAddress``` in config.js file in ./eth-bet/src/
5. Go to eth-bet folder and run npm start to start the UI
6. If backend is not properly connected, then an alert would popup in the browser window.


## Features
- [x] Populate predefined list of tournaments witin the UI.
  - [x] Backend
  - [x] React
- [x] Participate in a tournament - Player can send a prediction for a tournament outcome. 
  - [x] Backend
  - [x] React
- [x] Split prizes between winners(Can be more than one).
  - [x] Backend
  - [x] React
- [x] Binary choice(Either team A wins or team B).
  - [x] Backend
  - [x] React
- [x] Show winners for the past tournaments. 
  - [x] Backend
  - [x] React 
- [x] Set a number of players which can participate.
  - [x] Backend
  - [x] React
- [x] Conclude tournament and send prizes.
  - [x] Backend
  - [x] React
  - [x] Send money back if no one won.

## Demo video
Add demo video and a link here

## Referenes
1. Connect contract with UI instruction: https://docs.morpheuslabs.io/docs/connecting-the-smart-contract-to-a-webapp-step-by-step
2. Hand on smart contract development training https://learning.oreilly.com/library/view/hands-on-smart-contract/9781492045250/ch05.html
3. Web3js docs https://web3js.readthedocs.io/en/v1.3.0/
4. Reactbootstrap is a combination of bootstrap framework and react components https://react-bootstrap.github.io/components/alerts/
5. Bootstrap library https://getbootstrap.com/

## Team members 
Alex Silkin, 
Kevin Stepka 

Project log

| Date       | Deliverables          |
| --------   | --------------------- |
| 10/20/20   | Create git repository |
| 11/7/2020  | Create project        |
| 11/11/2020 | Write contract        |
| 11/11/2020 | Setup deployment      |
| 11/11/2020 | Setup infuraKey       |
| 11/11/2020 | Setup ABI with fs module|
| 11/13/2020 | Connect UI and backend|
| 11/13/2020 | Participate form submission mechanism created |
| 11/14/2020 | Edited Readme according to the requirements |
| 11/23/2020 | Features list added |
| 11/25/2020 | Edited Bet.sol contract |
| 12/3/2020  | Added events to Bet.sol |
| 12/3/2020  | Added handler for no winners situation |
 

