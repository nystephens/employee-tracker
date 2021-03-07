USE employee_tracker;

INSERT INTO departments (department_name)
VALUES
("Management"),
("Bakery"),
("Deli"),
("Grocery"),
("Frozen"),
("Produce"),
("Checkout");

INSERT INTO roles (title, salary, department_id)
VALUES
("General Manager", 80000.00, 1),
("Checkout Clerk", 20000.00, 7),
("Grocery Crew", 20000.00, NULL),
("Baker", 35000.00, 2),
("Butcher", 40000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Aprul", "Diaz", 1, NULL),
("Gill", "Frankel", 5, 1),
("Sherry", "McDonald", 3, 1),
("Katie", "Cormack", 4, 1),
("Kendall", "Mancino", 3, 1),
("Mark", "Rowley", 3, 1),
("Aisha", "Motumbo", 3, 1),
("Amy", "Grant", 2, 1),
("Hideki", "Matsui", 2, 1),
("Peirs", "Fern", 2, 1),
("Hugh", "Jass", 4, 1),
("Michelle", "Myers", 3, 1),
("Carolyn", "Ferarro", 4, 1),
("James", "Shanty", 4, 1),
("Mike", "Hunt", 3, 1),
("Lindsey", "Tauiliili", 2, 1),
("Vance", "Gerardo", 5, 1),
("Onuabe", "Collins", 5, 1);

