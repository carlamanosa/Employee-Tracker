USE employeeTracker_db;

INSERT INTO department (id, name)
VALUES (1, "Marketing"),
(2, "R&D"),
(3, "HR"),
(4, "Sales");


INSERT INTO role (id, title, salary, department_id)
VALUES (1, Engineer, 90000.00),
(2, Sales Manager, 80000.00),
(3,HR Manager , 80000.00);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("John", "Smith", 1),
-- ("Alexis", "Johnson", 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, 2),
(2, "Alexis", "Johnson", 3, 2);



