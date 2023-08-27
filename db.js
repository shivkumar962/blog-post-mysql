const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shiv',
    password:'shiv@1996',
    database: 'blogPost'
  });
  
  // simple query
  connection.query(
      'SELECT * FROM post limit 1',
     function(err, results, fields) {
        if(err){
        console.log('db connection error-->>',err); // results contains rows returned by server
        }
        console.log('db connected'); // results contains rows returned by server
      }
    );
module.exports.dbConnection = connection;