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

// start inquirer prompt
function prompUser() {
    inquirer
        .prompt(masterQuestion)
        .then(answers => {
            db.masterswitch(answers);
        })
        .catch(error => console.log(error));
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

prompUser();
