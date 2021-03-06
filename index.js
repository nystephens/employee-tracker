const inquirer = require('inquirer');
const mysql = require('mysql2');
const format = require('console.table');
const db = require('./db/database');

// this file will contain the inquirer prompt and the initiation function call

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker'
});

// need to create an employee, department, and role lists by query of sql db.  use lists in inquirer prompt for updateing and adding.
let employeeList = [];
let departmentList = [];
let roleList = [];


// Ask the master question in initial prompt.  When user selects and option for veiwing data, fire a SQL query that corresponds with that request. 
const masterQuestion = [
    {
        type: "list",
        name: "masterList",
        message: "What would you like to do with your Employee Tracker Database?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Exit Program"]
    }
];


// switch statment that has initial options as cases.  each case will contain the appropriate query for viewing table results.  if edit table options selected, then additional questions will fire.

function masterswitch(answers) {
    switch (answers) {
        case "View All Departments":
            db.viewAllDepartments();
            // promptUser();
            break;

        case "View All Roles":
            db.viewAllRoles();
            break;

        case "View All Employees":
            db.viewAllEmployees();
            break;

        case "Add a Department":
            db.addDepartment();
            break;

        case "Add a Role":
            db.addRole();
            break;

        case "Add an Employee":
            db.addEmployee();
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


// start inquirer prompt
function promptUser() {
    inquirer
        .prompt(masterQuestion)
        .then(answers => {
            // console.log(answers.masterList);
            masterswitch(answers.masterList);
            // promptUser();
        })
        .catch(error => console.log(error));
};

promptUser();
