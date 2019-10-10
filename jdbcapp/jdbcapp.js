// (C) Copyright IBM Corp. 2019 All Rights Reserved
//
// Licensed under the Apache License, Version 2.0
// which you can read at https://www.apache.org/licenses/LICENSE-2.0
//
// This program shows how Node.js can be use to retrieve data from
// Data Virtualization Manager using SQL and JDBC driver
//
// *****************************************************************
// * This code is the main program for the REST API that calls DVM *
// * using the JDBC driver                                         *
// *****************************************************************

const express = require('express');
const app = express();

var portNum = normalizePort(process.env.PORT || '50000');
app.set('port', portNum);

const dvmDB = require('./dbs');
const routes = require('./routes');
let appServer;

dvmDB.connect(startServer);

// Listen for SIGTERM to stop the server process
process.on('SIGTERM', stopServer);

function stopServer() {
  console.log('Node.js application will stop. SIGTERM signal received.');
  dvmDB.close();
  appServer.close(displayStopped);	
}

function startServer() {
  appServer = routes(app, dvmDB).listen(portNum, displayStarted);
}

function displayStarted() {
  console.log('Node.js application listening on port ' + portNum + ' (Process ' + process.pid + ')');
  console.log('To stop the Node application from MVS console, issue the following MVS command: F BPXOINIT,TERM=' + process.pid);
}

function displayStopped() {
  console.log('Node.js application with process ' + process.pid + ' is now stopped.');
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val;
  }

  // port number
  if (port >= 0) {
    return port;
  }

  return false;
}