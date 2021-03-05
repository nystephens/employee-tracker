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
("Assistant Store Manager", 60000.00, 1),
("Produce Manager", 50000.00, 6),
("Grocery Manager", 50000.00, 4),
("Frozen Goods Manager", 50000.00, 5),
("Checkout Clerk", 20000.00, 7),
("Grocery Crew", 20000.00, NULL),
("Baker", 35000.00, 2),
("Butcher", 40000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Aprul", "Diaz", 1, NULL),
("Gill", "Frankel", 2, 1),
("Sherry", "McDonald", 3, 2),
("Katie", "Cormack", 4, 2),
("Kendall", "Mancino", 5, 2),
("Mark", "Rowley", 7, 4),
("Aisha", "Motumbo", 7, 4),
("Amy", "Grant", 7, 3),
("Hideki", "Matsui", 6, 4),
("Peirs", "Fern", 6, 4),
("Hugh", "Jass", 7, 5),
("Michelle", "Myers", 7, 5),
("Carolyn", "Ferarro", 8, 2),
("James", "Shanty", 9, 2),
("Mike", "Hunt", 7, 13),
("Lindsey", "Tauiliili", 6, 4),
("Vance", "Gerardo", 7, 13),
("Onuabe", "Collins", 6, 14);

