# Using JDBC npm with Node.js applications on z/OS

This repository contains a sample Node.js application that uses the JDBC npm module to access z/OS data sources using JDBC.

## Prerequisites
 * The [IBM SDK for Node.js on z/OS Version 8](https://www.ibm.com/support/knowledgecenter/en/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/welcome.html) is installed and configured. There is a trial version available that you can download and use if you want to try Node.js on z/OS.  Refer to the [Node.js trial site](https://developer.ibm.com/node/sdk/ztp/) for additional information.

## Installing
 * Clone this repository `git clone git://github.com/yvestolod/node-rest-api-jdbc.git`
 * Install Node.js on your preferred platform (MacOS, Windows, Linux or z/OS). See the prerequisites section for information on installing the IBM SDK for Node.js on z/OS.
 * Open a command window (Note: You will need to use a telnet session when using Node.js on z/OS) and issue the following to install *express* and *request* in the *sample1* and *sample2* directories:
 ```
 npm install
 ```
