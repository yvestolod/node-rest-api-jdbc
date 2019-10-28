# Using the JDBC npm with Node.js on z/OS

This repository contains a sample Node.js application that uses the [JDBC npm](https://www.npmjs.com/package/jdbc) module to access z/OS data using JDBC.

The Node.js sample uses the [IBM Data Virtualization Manager for z/OS (DVM)](https://www.ibm.com/support/knowledgecenter/en/SS4NKG_1.1.0/home/kc_welcome_all.html) to access data from z/OS. With DVM, you can access data using SQL, NoSQL and a Web service interface.  It also supports a broad range of data sources, including mainframe relational/non-relational databases and file structures, mainframe applications and screens, distributed databases running on Linux, UNIX and Windows platforms, cloud-based relational and non-relational data, and NoSQL databases.

## Prerequisites
 * The [IBM SDK for Node.js on z/OS Version 8](https://www.ibm.com/support/knowledgecenter/en/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/welcome.html) is installed and configured. There is a trial version available that you can download and use if you want to try Node.js on z/OS.  Refer to the [Node.js trial site](https://developer.ibm.com/node/sdk/ztp/) for additional information.
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
 * Open a command window (Note: You will need to use a telnet or ssh session when using Node.js on z/OS) and issue the following:
 
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

<img src="https://github.com/yvestolod/node-rest-api-jdbc/blob/master/media/Sample2.png" height="75%" width="75%">

If you are looking to access Db2 on z/OS, then copy the **db2jcc4.jar** and **db2jcc_license_cisuz.jar** to the drivers directory.



