const inquirer = require('inquirer');
const mysql = require('mysql2');
const format = require('console.table');

// this file will contain the database queries

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker'
});



// this js file will house the connection.query functions for the app
// use console.table to format results

// not necessary just for test

function getEmployeeByRoles() {
    connection.query(
        'SELECT * FROM `employee` WHERE `role_id` = 6',
        function (err, results,) {
            console.table(results); // results contains rows returned by server
        }
    );
};

// getEmployeeByRoles();


// function to create managerList to be used in addEmployee
let managerList = function () {
    connection.query(
        `SELECT * FROM employees WHERE role <= 5`,
        function (err, results) {
            if (err) throw err;
            console.log(results);
            return results;
        }
    );
};




function viewAllDepartments() {
    connection.query(
        `SELECT * FROM departments`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
    );
};


function viewAllRoles() {
    connection.query(
        `SELECT * FROM roles`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
    );
};


function viewAllEmployees() {
    connection.query(
        `SELECT * FROM employees`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
    );
};


function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "newDepName",
                message: "Please enter the name for the new department:  "
            }
        ])
        .then(answers => {
            connection.query(
                `INSERT INTO departments SET ?`,
                {
                    department_name: answers.newDepName
                },
                function (err, results) {
                    if (err) throw err;
                    console.log("New Department Added!");
                }
            );
        });
};


function addRole() {
    // get all department names for choices
    connection.query(
        `SELECT * FROM departments`,
        function (err, results) {
            if (err) throw err;

            let departmentList = results.map(department => ({
                name: department.department_name, value: department.id
            }));

            // ask questions for new role 
            inquirer.prompt([
                {
                    type: "input",
                    name: "newRoleName",
                    message: "Please enter the name of the new role:  "
                },
                {
                    type: "input",
                    name: "newRoleSalary",
                    message: "Please enter the salary for the new role:  "
                },
                {
                    type: "list",
                    name: "newRoleDep",
                    message: "Please slect the new role's department.",
                    choices: departmentList
                }
            ])
                // insert new role answers into table using INSERT INTO 
                .then(answers => {
                    connection.query(
                        `INSERT INTO roles SET ?`,
                        {
                            title: answers.newRoleName,
                            salary: answers.newRoleSalary,
                            department_id: answers.newRoleDep
                        },
                        function (err, results) {
                            if (err) throw err;
                            console.log("New Role Added");

                            // return user to initial questions.
                            // promptUser();
                        }
                    );
                })
        }
    );
};


function addEmployee() {
    connection.query(
        // grab roleList from roles table
        `SELECT * FROM roles`,
        function (err, results) {
            if (err) throw err;

            let roleList = results.map(role => ({
                name: role.title, value: role.id
            }));

            // grab managerList from employees table

            // ask questions for new role 
            inquirer.prompt([
                {
                    type: "input",
                    name: "empFirstName",
                    message: "Please enter the new employee's first name:  "
                },
                {
                    type: "input",
                    name: "empLastName",
                    message: "Please enter the new employee's last name:  "
                },
                {
                    type: "list",
                    name: "empRole",
                    message: "Please slect the new employee's role.",
                    choices: roleList
                },
                {
                    type: "list",
                    name: "empManager",
                    message: "Please select the new employee's manager.",
                    choices: managerList
                }
            ])
                // insert new employee answers into table using INSERT INTO 
                .then(answers => {
                    connection.query(
                        `INSERT INTO roles SET ?`,
                        {
                            first_name: answers.empFirstName,
                            last_name: answers.empLastName,
                            role_id: answers.empRole,
                            manager_id: answers.empManager
                        },
                        function (err, results) {
                            if (err) throw err;
                            console.log("New Employee Added");

                            // return user to initial questions.
                            // promptUser();
                        }
                    );
                })
        }
    );
};


function updateEmpRole() {
    // need to grab list of employees to select from.
    connection.query(
        `SELECT first_name, last_name FROM employees`,
        function (err, results) {
            if (err) throw err;
            let empList = results.map(employee => ({
                name: employee.title, value: employee.id
            }));

            // ask what employee to update using empList
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "empRole",
                        message: "Please select an employee to update.",
                        choices: empList
                    }
                ])
                .then(answers => {
                    connection.query(
                        // grab roleList from roles table
                        `SELECT * FROM roles`,
                        function (err, results) {
                            if (err) throw err;

                            let roleList = results.map(role => ({
                                name: role.title, value: role.id
                            }));

                            // ask questions for new role 
                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "empRole",
                                    message: "Please select the new employee's role.",
                                    choices: roleList
                                }
                            ])
                                // insert new employee answers into table using INSERT INTO 
                                .then(answers => {
                                    connection.query(
                                        `INSERT INTO roles SET ?`,
                                        { role_id: answers.empRole },
                                        function (err, results) {
                                            if (err) throw err;
                                            console.log("New Role Updated!");
                                            // return user to initial questions.
                                            // promptUser();
                                        }
                                    );
                                })
                        }
                    );
                })
        }
    );
};

module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllRoles: viewAllRoles,
    viewAllDepartments: viewAllDepartments,
    addEmployee: addEmployee,
    addRole: addRole,
    addDepartment: addDepartment,
    updateEmpRole: updateEmpRole
};

