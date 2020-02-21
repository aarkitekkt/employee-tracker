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

CREATE TABLE managers (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_ID INT NULL,
    PRIMARY KEY (id)
);

SELECT employees.id, first_name, last_name, title, salary, department, manager
from employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN managers ON managers.department_id = departments.id;



-- Seed Department Table

INSERT INTO departments (department)
VALUES ("Forwards"), ("Midfielders"), ("Defenders"), ("GoalKeepers");

SELECT * FROM department;

-- Seed Role Table

INSERT INTO roles (title, salary, department_id)
VALUES 
("Striker", 250000, 1),
("Winger", 175000, 1),
("Defensive Mid", 125000, 2),
("Central Mid", 150000, 2),
("Attacking Mid", 200000, 2),
("Center Back", 130000, 3),
("Wing Back", 125000, 3),
("GoalKeeper", 110000, 4);

SELECT * FROM role;

-- Seed Employees Table

INSERT INTO employees (first_name, last_name, role_id)
VALUES

("Fernando", "Torres", 1),
("Zlatan", "Ibrahimovic",1),
("Eden", "Hazard",2),
("Mohammed", "Salah",2),
("Sadio", "Mane",2),
("Andrea", "Pirlo",3),
("Kyle", "Beckerman",3),
("Andres", "Iniesta",4),
("N'Golo", "Kante",3),
("Ricardo", "Kaka",5),
("Lionel", "Messi",5),
("Sergio", "Ramos",6),
("Gerard", "Pique",6),
("Virgil", "Van Dyke"6),
("Marcelo", "Silva",7),
("Dani", "Alves",7),
("Cesar", "Azpilicueta",7),
("Trent", "Alexander-Arnold",7),
("Manuel", "Neuer",8),
("Andre", "Ter-Stegen",8),
("Nick", "Rimando",8),
("Jose", "Mourinho", 9),
("Pep", "Guardiola", 9),
("Jurgen", "Klopp", 9);




