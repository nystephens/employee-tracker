const inquirer = require('inquirer');
const msyql = require('mysql2');
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



// // this js file will house the connection.query functions for the app
// // use console.table to format results

function getEmployeeByRoles() {
    connection.query(
        'SELECT * FROM `employee` WHERE `role_id` = 6',
        function (err, results,) {
            console.log(results); // results contains rows returned by server
        }
    );
};

getEmployeeByRoles();

// switch statment that has initial options as cases.  each case will contain the appropriate query for viewing table results.  if edit table options selected, then additional questions will fire.

function masterswitch() {
    switch (answers) {
        case "View All Departments":
            // query to view departments
            break;

        case "View All Roles":
            // query to view roles
            break;

        case "View All Employees":
            // query to view employees
            break;

        case "Add a Department":
            // call addDepartment();
            break;

        case "Add a Role":
            // call addRole();
            break;

        case "Add an Employee":
            // call addEmployee();
            break;

        case "Update Employee Role":
            // call updateEmpRole();
            break;

        case "Exit Program":
            // exit program
            console.log("Goodbye!");
            break;

        default:
            console.log("No option selected.");
            break;
    }
};

// module.exports = 

