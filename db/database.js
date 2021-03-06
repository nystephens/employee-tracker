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

function getEmployeeByRoles() {
    connection.query(
        'SELECT * FROM `employee` WHERE `role_id` = 6',
        function (err, results,) {
            console.log(results); // results contains rows returned by server
        }
    );
};

getEmployeeByRoles();


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
                            prompUser();
                        }
                    );
                })
        }
    );
};


function addEmployee() {

};


function updateEmpRole() {

};

module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllRoles: viewAllRoles,
    viewAllDepartments: viewAllDepartments,
    addEmployee: addEmployee,
    addRole: addRole,
    addDepartment: addDepartment
};

