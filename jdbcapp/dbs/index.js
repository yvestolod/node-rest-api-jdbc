// (C) Copyright IBM Corp. 2019 All Rights Reserved
//
// Licensed under the Apache License, Version 2.0
// which you can read at https://wwwc.apache.org/licenses/LICENSE-2.0
//
// This program shows how Node.js can be use to retrieve data from
// Data Virtualization Manager using SQL and JDBC driver
//
// *******************************************************
// * This code handles the database connection for reuse *
// *******************************************************

const JDBC = require('jdbc');
const jinst = require('jdbc/lib/jinst');
let connection;
let dvmJDBC;

var dvmConfig = {
  url: 'jdbc:rs:dv://' + process.env.DVMHOST + ':' + process.env.DVMPORT + '; DatabaseType=DVS; user=' + process.env.DVMUSER + '; password=' + process.env.DVMPWD,
  drivername: 'com.rs.jdbc.dv.DvDriver',
  minpoolsize: 1,
  maxpoolsize: 5
};

function connect(callback) {

  // The flow is as follows:
  // 1. Create the JVM (one time, at the beginning)
  // 2. Create a JDBC connection to DVM
  // 3. Initialize the connection
  // 4. Reserve a connection

  if (!jinst.isJvmCreated()) {
    console.log('Setting up the JVM');
    jinst.addOption("-Xrs");

    // Add the location of the log4j2.xml configuration file otherwise you will get the message
    // ERROR StatusLogger No log4j2 configuration file found.
    jinst.addOption("-Dlog4j.configurationFile=./log4j2.xml");

    // Setup the CLASSPATH required to talk to DVM
    jinst.setupClasspath(['./drivers/dv-jdbc-3.1.201810011236.jar',
                          './drivers/log4j-api-2.8.2.jar',
                          './drivers/log4j-core-2.8.2.jar']);
  }

  console.log('Getting driver...');

  dvmJDBC = new JDBC(dvmConfig);

  var handleResult = function(err) {
    var checkConnection = function(err, connObj) {

      // The connection returned from the pool is an object
      // with two fields {uuid: <uuid>, conn: <connection>}
      if (connObj) {
        console.log('Connection reserved: ' + connObj.uuid);
        connection = connObj.conn;
      }
    }

    // Reserve a connection
    if (err) {
      console.log(err.message);
    }
    else {
      console.log('Reserving connection ...');
      dvmJDBC.reserve(checkConnection);
    }
  }

  console.log('Initializing connection...');
  dvmJDBC.initialize(handleResult);

  callback();
}


function getConnection() {
  return connection;
}

function close() {

  var displayResult = function(err) {
    // Display the error message
    if (err) {
      console.log(err.message);
    }
  }

  connection.close(displayResult);
  dvmJDBC.release(connection, displayResult);

  console.log('JDBC connection to DVM was closed.');
}

module.exports = {
  connect,
  getConnection,
  close
};
