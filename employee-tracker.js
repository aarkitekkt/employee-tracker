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

    var query = "SELECT employees.id, first_name, last_name, title, salary, department FROM employees " +
        "LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('\n', '---------Employees-----------', '\n');
        console.table(res);

        start();
    });
};

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
    var query = "SELECT first_name, last_name, title, salary FROM employees " +
        "INNER JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id WHERE ?";

    connection.query(query, { department: dept.action }, function (err, res) {
        if (err) throw err;
        console.table(res)

        start();
    })
};

function showRoles() {

    var query = "SELECT title from roles;"

    connection.query(query, function (err, res) {
        if (err) throw err;

        var rolesList = [];
        console.log('\n', '---------Roles-----------', '\n');

        for (let i = 0; i < res.length; i++) {
            rolesList.push(res[i].title);
        }

        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Which Role Would You Like To View?",
                choices: rolesList
            }).then(function (answer) {
                showRoleEmployees(answer);
            });
    });
};

function showRoleEmployees(role) {
    var query = "SELECT first_name, last_name, title, salary FROM employees " +
        "INNER JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id WHERE ?";

    connection.query(query, { title: role.action }, function (err, res) {
        if (err) throw err;
        console.table(res)

        start();
    })
};

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        })
        .then(function (answer) {

            console.log(answer.department);

            connection.query("INSERT INTO departments (department) VALUES (?)", [answer.department], function (err, res) {
                if (err) throw err;

                console.log(answer.department + " added to departments!")

                start();
            });
        });
};

function addRole() {

    connection.query("SELECT * from departments;", function (err, res) {
        if (err) throw err;

        var departmentList = [];

        for (let i = 0; i < res.length; i++) {
            departmentList.push(res[i].department);
        }

        inquirer
            .prompt([{
                name: "role",
                type: "input",
                message: "What role would you like to add?"
            }, {
                name: "salary",
                type: "input",
                message: "What is this roles salary?"
            }, {
                name: "department",
                type: "list",
                message: "Which Department Does This Role Belong To?",
                choices: departmentList
            }])
            .then(function (answer) {

                let departmentId = "";

                for (let i = 0; i < departmentList.length; i++) {
                    if (res[i].department === answer.department) {
                        departmentId = res[i].id;
                    }
                };

                let newRoleData = [answer.role, answer.salary, departmentId];

                console.log(newRoleData);

                connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?)", [newRoleData], function (err, res) {
                    if (err) throw err;

                    console.log(answer.role + " added to roles!")

                    start();
                });
            });
    });
};

function updateEmployee() {
    var query = "SELECT employees.id, first_name, last_name, title FROM employees " +
        "LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";

    connection.query(query, function (err, res) {
        if (err) throw err;

        var employeeList = [];
        var employeeId = "";
        var newRole = ""

        for (let i = 0; i < res.length; i++) {
            employeeList.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name + " | " + res[i].title);
        }

        inquirer
            .prompt({
                name: "employee",
                type: "list",
                message: "Which Employee Role Would You Like To Update?",
                choices: employeeList
            })
            .then(function (answer) {

                employeeId = answer.employee.charAt(0);

                connection.query("SELECT title from roles;", function (err, res) {
                    if (err) throw err;

                    var rolesList = [];

                    for (let i = 0; i < res.length; i++) {
                        rolesList.push(res[i].title);
                    }

                    inquirer
                        .prompt({
                            name: "newRole",
                            type: "list",
                            message: "What Is The New Role?",
                            choices: rolesList
                        }).then(function (answer) {

                            newRole = answer.newRole;


                            console.log(employeeId, newRole);

                            var query = "UPDATE employees " +
                                "LEFT JOIN roles ON employees.role_id = roles.id " +
                                "LEFT JOIN departments ON roles.department_id = departments.id " +
                                "SET title = ? " +
                                "WHERE employees.id = ?;"

                            connection.query(query, [newRole, employeeId], function (err, res) {
                                if (err) throw err;

                                console.log("Title changed to " + newRole);

                                start();
                            });
                        });


                })


            })
    })
};