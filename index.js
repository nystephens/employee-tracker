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


// if the user selects an option to edit a table then ask for additional input

const addDepQuest = [
    {
        type: "input",
        name: "newDepName",
        message: "Please enter the name for the new department:  "
    }
];

const addEmployeeQuest = [
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
        choice: [roleList]
    },
    {
        type: "input",
        name: "empManager",
        message: "Please enter the new employee's manager:  "
    }
];

const updateRoleQuest = [
    {
        type: "list",
        name: "selectEmployee",
        message: "Please select an employee to update.",
        choices: [employeeList]
    },
    {
        type: "list",
        name: "newRole",
        message: "Please select a new role to be assigned to this employee.",
        choices: roleList
    }
];


// switch statment that has initial options as cases.  each case will contain the appropriate query for viewing table results.  if edit table options selected, then additional questions will fire.

function masterswitch(answers) {
    switch (answers) {
        case "View All Departments":
            viewAllDepartments();
            promptUser();
            break;

        case "View All Roles":
            viewAllRoles();
            break;

        case "View All Employees":
            viewAllEmployees();
            break;

        case "Add a Department":
            // call addDepartment();
            break;

        case "Add a Role":
            addRole();
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


// start inquirer prompt
function promptUser() {
    inquirer
        .prompt(masterQuestion)
        .then(answers => {
            // console.log(answers.masterList);
            db.masterswitch(answers.masterList);
        })
        .catch(error => console.log(error));
};

promptUser();
