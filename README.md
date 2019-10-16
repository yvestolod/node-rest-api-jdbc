# Using JDBC npm with Node.js applications on z/OS

This repository contains a sample Node.js application that uses the [JDBC npm](https://www.npmjs.com/package/jdbc) module to access z/OS data sources using JDBC.

## Prerequisites
 * The [IBM SDK for Node.js on z/OS Version 8](https://www.ibm.com/support/knowledgecenter/en/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/welcome.html) is installed and configured. There is a trial version available that you can download and use if you want to try Node.js on z/OS.  Refer to the [Node.js trial site](https://developer.ibm.com/node/sdk/ztp/) for additional information.
 * The jdbc npm module includes native add-ons. To be able to compile native add-ons on z/OS, you need [Python 2.7.3] (http://www.rocketsoftware.com/zos-open-source/python) and [Make 4.1](http://www.rocketsoftware.com/zos-open-source/make?ver=4.1) installed and available in your PATH. Refer to the **README** documentation on each package for instructions on how to install and configure Python and Make. After setting up Make and Python, check the version to see if it is now accessible.
 
```
> make --version
> python --version
```

## Installing
 * Clone this repository `git clone git://github.com/yvestolod/node-rest-api-jdbc.git`
 * Install Node.js on your preferred platform (MacOS, Windows, Linux or z/OS). See the prerequisites section for information on installing the IBM SDK for Node.js on z/OS.
 * Open a command window (Note: You will need to use a telnet session when using Node.js on z/OS) and issue the following to install *express* and *request* in the *sample1* and *sample2* directories:
 ```
 npm install
 ```
