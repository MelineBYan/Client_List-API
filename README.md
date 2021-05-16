### Client List REST API

An application used to create new clients, built with Node.js, Express.js, MongoDB.

Installation and Setup Instructions

You will need node and npm installed globally on your machine.

Node js Installation

You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/)

npm might need [git](https://git-scm.com/)).

###Database Setup (Linux)

Download and install MongoDB http://www.mongodb.org/downloads
Start the MongoDb service sudo service mongodb restart
###Database Setup (Windows)

Download and install MongoDB http://www.mongodb.org/downloads

Create the following folder C:\data\db

If MongoDb has not been installed as a service run the MonogoDB demon mongod.exe

## Project installation and usage

    $ git clone https://github.com/MelineBYan/Client_list_API
    $ npm install

###Create environment:

Remove `.sample` extension from configuration files located in `/config/env/`
`sh dev.env.sample -> dev.env prod.env.sample -> prod.env `

## Running the project

    $ npm start
