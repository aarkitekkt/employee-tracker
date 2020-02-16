var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: process.env.MYSQL_PASSWORD,
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    showEmployees();
})

function showEmployees() {

    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}