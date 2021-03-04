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
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Employee

-- id: INT PRIMARY KEY

-- first_name: VARCHAR(30) to hold employee first name

-- last_name: VARCHAR(30) to hold employee last name

-- role_id: INT to hold reference to employee role

-- manager_id: INT to hold reference to another employee that is manager of the current employee. This field may be null if the employee has no manager.