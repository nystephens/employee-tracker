DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

-- Departments
CREATE TABLE departments (
    id: INT PRIMARY KEY,
    name: VARCHAR(30) NOT NULL
);


-- Roles
CREATE TABLE roles(
    id: INT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL(p,s),
    department_id: INTEGER UNSIGNED,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Employee
CREATE TABLE employees (
    id: INTEGER PRIMARY KEY,
    first_name: VARCHAR(30),
    last_name: VARCHAR(30),
    role_id: INTEGER UNSIGNED,
    manager_id: INTEGER UNSIGNED,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTRAINT fk_employees FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
-- check if this logic works V
-- manager_id: INT to hold reference to another employee that is manager of the current employee. This field may be null if the employee has no manager.