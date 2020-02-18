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
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View Departments",
                "View Roles",
                "Add New Employee",
                "Add New Department",
                "Add New Role",
                "Update Employee Role",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    showEmployees();
                    break;

                case "View Departments":
                    showDepartments();
                    break;

                case "View Roles":
                    showRoles();
                    break;

                case "Add New Employee":
                    addEmployee();
                    break;

                case "Add New Department":
                    addDepartment();
                    break;

                case "Add New Role":
                    addRole();
                    break;

                case "Update Employee Role":
                    updateEmployee();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}




function showEmployees() {

    var query = "SELECT first_name, last_name, title, salary, department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('\n', '---------Employees-----------', '\n');
        console.table(res);

        start();
    });
}

function showDepartments() {

    var query = "SELECT department from departments;"

    connection.query(query, function (err, res) {
        if (err) throw err;

        var departmentList = [];
        console.log('\n', '---------Departments-----------', '\n');

        for (let i = 0; i < res.length; i++) {
            departmentList.push(res[i].department);
        }

        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Which Department Would You Like To View?",
                choices: departmentList
            }).then(function (answer) {
                showDepartmentEmployees(answer);
            });


    });
};


function showDepartmentEmployees(dept) {
    var query = "SELECT first_name, last_name, title, salary FROM employees INNER JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id WHERE ?";

    connection.query(query, { department: dept.action }, function (err, res) {
        if (err) throw err;
        console.table(res)

        start();
    })
};
