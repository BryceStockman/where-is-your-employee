const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HUbFvbt3@mtLhmJ$M4N5d-yYsV_ZvvP',
  database: 'employee_tracker',
});

module.exports = db;
