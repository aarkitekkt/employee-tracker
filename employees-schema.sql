DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

-- Create tables

CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INT NOT NULL
  PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_ID INT NULL,
    PRIMARY KEY (id)
);

SELECT first_name, last_name, title, salary, name
from employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;



-- Seed Department Table

INSERT INTO departments (department)
VALUES ("Forwards"), ("Midfielders"), ("Defenders"), ("GoalKeepers");

SELECT * FROM department;

-- Seed Role Table

INSERT INTO role (title, salary, department_id)
VALUES ("Forward Manager", 300000, 1),
("Striker", 250000, 1),
("Winger", 175000, 1),
("Midfield Manager", 300000, 2),
("Defensive Mid", 125000, 2),
("Central Mid", 150000, 2),
("Attacking Mid", 200000, 2),
("Defense Manager", 300000, 3),
("Center Back", 130000, 3),
("Wing Back", 125000, 3),
("GoalKeeper Manager", 300000, 4),
("GoalKeeper", 110000, 4);

SELECT * FROM role;

-- Seed Employees Table

INSERT INTO employees (first_name, last_name, role_id, manager_ID)
VALUES
("Diego", "Maradona", 1, NULL),
("Johan", "Cruyff", 4, NULL),
("Franz", "Beckenbauer", 8, NULL),
("Gianluigi", "Buffon", 11, NULL),
("Fernando", "Torres", 2, 1),
("Zlatan", "Ibrahimovic", 2, 1),
("Eden", "Hazard", 3, 1),
("Mohammed", "Salah", 3,1),
("Sadio", "Mane", 3,1),
("Andrea", "Pirlo", 5,2),
("Kyle", "Beckerman", 5,2),
("Andres", "Iniesta", 6,2),
("N'Golo", "Kante", 6,2),
("Ricardo", "Kaka", 7,2),
("Lionel", "Messi", 7,2),
("Sergio", "Ramos", 9,3),
("Gerard", "Pique", 9,3),
("Virgil", "Van Dyke", 9,3),
("Marcelo", "Silva", 10,3),
("Dani", "Alves", 10,3),
("Cesar", "Azpilicueta", 10,3),
("Trent", "Alexander-Arnold", 10,3),
("Manuel", "Neuer", 12, 4),
("Andre", "Ter-Stegen", 12, 4),
("Nick", "Rimando", 12,4);




