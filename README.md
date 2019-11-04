# Using the JDBC npm with Node.js on z/OS

This repository contains a sample Node.js application that uses the [JDBC npm](https://www.npmjs.com/package/jdbc) module to access z/OS data using JDBC.

## About the Sample

The Node.js sample uses [IBM Data Virtualization Manager for z/OS (DVM)](https://www.ibm.com/support/knowledgecenter/en/SS4NKG_1.1.0/home/kc_welcome_all.html) to access data from z/OS. With DVM, you can access data using SQL, NoSQL and a Web service interface.  It also supports a broad range of data sources, including mainframe relational/non-relational databases and file structures, mainframe applications and screens, distributed databases running on Linux, UNIX and Windows platforms, cloud-based relational and non-relational data, and NoSQL databases.

The sample Node.js program can be accessed using REST API. It uses JDBC and SQL to access VSAM data.

<img src="https://github.com/yvestolod/node-rest-api-jdbc/blob/master/media/Sample-Program.png" height="75%" width="75%">

## Prerequisites
 * The [IBM SDK for Node.js on z/OS Version 8](https://www.ibm.com/support/knowledgecenter/en/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/welcome.html) is installed and configured. There is a trial version available that you can download and use if you want to try Node.js on z/OS.  Refer to the [Node.js trial site](https://developer.ibm.com/node/sdk/ztp/) for additional information.
 * [IBM 64-bit SDK for z/OS, Java™ Technology Edition V8.0.0](https://developer.ibm.com/javasdk/support/zos/#v8) or later.
 * The jdbc npm module includes native add-ons. To be able to compile native add-ons on z/OS, you need [Python 2.7.3](http://www.rocketsoftware.com/zos-open-source/python) and [Make 4.1](http://www.rocketsoftware.com/zos-open-source/make?ver=4.1) installed and available in your PATH. Refer to the **README** documentation on each package for instructions on how to install and configure Python and Make. After setting up Make and Python, check the version to see if it is now accessible.
 
```
make --version
```
```
python --version
```

## Installing
 * Clone this repository `git clone git://github.com/yvestolod/node-rest-api-jdbc.git`
 * Install Node.js on your preferred platform (MacOS, Windows, Linux or z/OS). See the prerequisites section for information on installing the IBM SDK for Node.js on z/OS.
 * Open a command window (Note: You will need to use a telnet or ssh session when using Node.js on z/OS) and issue the following (Note: For z/OS you need to setup additional environment variables to be able to install the JDBC npm module):
 
 ```
 npm install
 ```
* Set the environment variables required to compile the JDBC native modules on z/OS. Issue the following commands to set these environment variables (modify the JAVA_HOME based on the location of Java 8 64-bit in your environment):

```
export CXXFLAGS="-U_VARARG_EXT_ -qnoopt"
export JAVA_HOME=/usr/lpp/java/IBM/current_64/
```
* Create a drivers directory under the jdbcapp application directory and copy the JDBC drivers to the directory

```
cd <path>/jdbcapp
mkdir drivers
```

**Note:** The sample uses the [IBM Data Virtualization Manager (DVM) JDBC driver](https://www.ibm.com/support/knowledgecenter/en/SS4NKG_1.1.0/havica10/topics/azk_ig_tsk_inst_JDBC_drivers.html). For DVM, you need to copy the following files to the drivers directory:

<img src="https://github.com/yvestolod/node-rest-api-jdbc/blob/master/media/Sample1.png" height="75%" width="75%">

You also need to copy the log4j2.xml file into the jdbcapp directory.

<img src="https://github.com/yvestolod/node-rest-api-jdbc/blob/master/media/Sample2.png" height="70%" width="70%">

If you are looking to access Db2 on z/OS, then copy the **db2jcc4.jar** and **db2jcc_license_cisuz.jar** to the drivers directory. You also need to modify the sample code to use the Db2 JDBC drivers.

* Install the JDBC npm nodule using the following command:

```
LDFLAGS="$JAVA_HOME/lib/s390x/j9vm/libjvm.x" V=1 npm install --javahome=$JAVA_HOME jdbc
```

* Set the LIBPATH environment variable to add the location of the Java shared objects using the following command:

```
export LIBPATH=$JAVA_HOME/lib/s390x/classic:$LIBPATH
```

* Update the environment variables in the .env file with the correct values

```
PORT=node-port
DVMHOST=dvm.host.name
DVMPORT=dvm-port
DVMUSER=dvmuser
DVMPWD=dvmpwd
```

## Running the Sample program

To run the sample program from the z/OS UNIX shell, issue the following:

```
cd <path>/jdbcapp
node jdbcapp.js
```

To run the sample program as a started task, you can use the following:

```
//NODEAPP1 PROC
//*
// SET NODEHOME='/usr/lpp/IBM/cnj/IBM/node-latest-os390-s390x'
// SET NODEAPP='/var/node/jdbcsamp/jdbcsamp.js'
//*
//RUNNODE EXEC PGM=BPXBATSL,REGION=0M,MEMLIMIT=4G,
// PARM='PGM &NODEHOME./bin/node &NODEAPP.'
//STDOUT  DD  SYSOUT=*
//STDERR  DD  SYSOUT=*
//MSGLOG  DD  SYSOUT=*
//STDIN   DD  DUMMY
//STDENV  DD  *
//*
```

The following are sample messages that are displayed on the console:

```
Setting up the JVM
Getting driver...
Initializing connection...
Node.js application listening on port 50000 (Process 16780178)
To stop the Node application from MVS console, issue the following
MVS command: F BPXOINIT,TERM=16780178
2019-09-24 12:19:06,095 WARN [Thread-
5][com.rs.jdbc.dv.DvSocketConnection.com.ibm.pok.cc9.demomvs.12050
] You requested the maximum buffer size to be 262,144 bytes, but
the server can only do up to 98,304, using 98,304.
Reserving connection ...
Connection reserved: 7b48d857-381a-46ba-a79f-79ae33129173
```

On a browser or REST client, you can type the following to call the Node.js sample:

```
http://<hostname>:<port>/dvm/vsam/all/staff
```

The following is the sample output of the REST API call:

<img src="https://github.com/yvestolod/node-rest-api-jdbc/blob/master/media/Sample3.png" height="65%" width="65%">
