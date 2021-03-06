USE employee_tracker;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

-- Departments
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


-- Roles
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(7,2),
    department_id INT,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

-- Employee
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_employees FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);
-- check if this logic works V
-- manager_id INT to hold reference to another employee that is manager of the current employee. This field may be null if the employee has no manager.