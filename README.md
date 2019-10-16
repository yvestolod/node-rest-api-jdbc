# Using JDBC npm with Node.js applications on z/OS

This repository contains sample Node.js applications that demonstrates how you can combine data from multiple sources with API orchestration. The samples use REST APIs created by [z/OS Connect Enterprise Edition](https://www.ibm.com/support/knowledgecenter/en/SS4SVW_3.0.0/com.ibm.zosconnect.doc/overview/what_is_new.html) to access z/OS applications and data hosted in subsystems such as CICS, IMS and Db2. The samples are designed to work on z/OS and non-z/OS environments.

**Note:** For the REST APIs created by z/OS Connect Enterprise Edition, you also have the option to use [zosconnect-node](https://github.com/yvestolod/zosconnect-node) to call the REST APIs. 

## Prerequisites
 * The [IBM SDK for Node.js on z/OS](https://www.ibm.com/support/knowledgecenter/en/SSTRRS_6.0.0/com.ibm.nodejs.zos.v6.doc/welcome.html) is installed and configured. There is a trial version available that you can download and use if you want to try Node.js on z/OS.  Refer to the [Node.js trial site](https://developer.ibm.com/node/sdk/ztp/) for additional information.

## Installing
 * Clone this repository `git clone git://github.com/yvestolod/node-rest-api-jdbc.git`
 * Install Node.js on your preferred platform (MacOS, Windows, Linux or z/OS). See the prerequisites section for information on installing the IBM SDK for Node.js on z/OS.
 * Open a command window (Note: You will need to use a telnet session when using Node.js on z/OS) and issue the following to install *express* and *request* in the *sample1* and *sample2* directories:
 ```
 npm install
 ```
