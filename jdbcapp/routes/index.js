// (C) Copyright IBM Corp. 2019 All Rights Reserved
//
// Licensed under the Apache License, Version 2.0
// which you can read at https://www.apache.org/licenses/LICENSE-2.0
//
// This program shows how Node.js can be use to retrieve data from
// Data Virtualization Manager using SQL and JDBC driver
//
// **********************************************
// * This code handles the routing of the calls *
// **********************************************

module.exports = function(app, dbs) {

  app.get('/dvm/vsam/staff/:staffnum', function (req, res) {
    const staffno = req.params.staffnum;
    const sql = "SELECT * FROM SAMPLE_STAFF_VSAM WHERE STAFFVS_KEY_ID = " + staffno;
    var dbConn = dbs.getConnection();

    var runSQL = function (err, statement) {
      var checkError = function(err) {
        if (err) {
          console.log('Error encountered when closing object');
          console.log(err.message);
        }
      };

      if (err) {
        console.log('Error creating statement');
        console.log(err.message);
      }
      else {
        statement.executeQuery(sql, function (err, resultSet) {
          if (err) {
            console.log('Error retrieving results');
            console.log(err.message);
          }
          else {
            resultSet.toObjArray (function (err, rows) {
              if (err) {
                console.log('Error returning rows');
                res.status(500).send(err);
              }
              else {
                if (rows.length > 0) {
                  res.status(200).send(rows);
                }
                else {
                  res.status(200).send({ 'Rows returned' : '0' });
                }
              }

              resultSet.close(checkError);
              statement.close(checkError);
            });
          }
        });
      }
    };

    dbConn.createStatement(runSQL);
  });

  app.get('/dvm/vsam/all/staff', function (req, res) {
    const sql = "SELECT * FROM SAMPLE_STAFF_VSAM";
    var dbConn = dbs.getConnection();

    var runSQL = function (err, statement) {
      var checkError = function(err) {
        if (err) {
          console.log('Error encountered when closing object');
          console.log(err.message);
        }
      };

      if (err) {
        console.log('Error creating statement');
        console.log(err.message);
      }
      else {
        statement.executeQuery(sql, function (err, resultSet) {
          if (err) {
            console.log('Error retrieving results');
            console.log(err.message);
          }
          else {
            resultSet.toObjArray (function (err, rows) {
              if (err) {
                console.log('Error returning rows');
                res.status(500).send(err);
              }
              else {
                if (rows.length > 0) {
                  res.status(200).send(rows);
                }
                else {
                  res.status(200).send({ 'Rows returned' : '0' });
                }
              }

              resultSet.close(checkError);
              statement.close(checkError);
            });
          }
        });
      }
    };

    dbConn.createStatement(runSQL);
  });

  app.get('/', function (req, res) {
    res.write("=====================================================================\n");
    res.write("=            Node.js sample application running on z/OS.            =\n");
    res.write("=====================================================================\n");
    res.write("=  *****  ******   ***   ****  **    **    ****** **  **    ******  =\n");
    res.write("=  ** *** **      ** **  ** **  **  **     **  ** *** **       **   =\n");
    res.write("=  *****  ****** ******* **  **  ****      **  ** ******      **    =\n");
    res.write("=  ** **  **     **   ** ** **    **       **  ** ** ***     **     =\n");
    res.write("=  **  ** ****** **   ** ****     **       ****** **  **    ******  =\n");
    res.write("=====================================================================\n");
    res.end();
  });

  return app;
}
