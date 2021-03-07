const inquirer = require('inquirer');
const mysql = require('mysql2');
const format = require('console.table');


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker'
});


// Ask the master question in initial prompt.  When user selects and option for veiwing data, fire a SQL query that corresponds with that request. 
const masterQuestion = [
    {
        type: "list",
        name: "masterList",
        message: "What would you like to do with your Employee Tracker Database?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Exit Program"]
    }
];

//function for more actions
const moreActions = () => {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Would you like to do anything more with your Employee Database?',
        name: 'moreActions',
        default: false
    }]).then(({ moreActions }) => {
        if (moreActions) {
            return promptUser();
        } connection.end();
    })
    .catch(err => console.log(err));
}

// switch statment that has initial options as cases.  each case will contain the appropriate query for viewing table results.  if edit table options selected, then additional questions will fire.
function masterswitch(answers) {
    switch (answers) {
        case "View All Departments":
            viewAllDepartments();
            break;

        case "View All Roles":
            viewAllRoles();
            break;

        case "View All Employees":
            viewAllEmployees();
            break;

        case "Add a Department":
            addDepartment();
            break;

        case "Add a Role":
            addRole();
            break;

        case "Add an Employee":
            addEmployee();
            break;

        case "Update Employee Role":
            updateEmp();
            break;

        case "Exit Program":
            console.log("Goodbye!");
            connection.end();
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
            masterswitch(answers.masterList);
        })
        .catch(error => console.log(error));
};


function viewAllDepartments() {
    connection.query(
        `SELECT * FROM departments`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            moreActions();
        }
    );
};


function viewAllRoles() {
    connection.query(
        `SELECT * FROM roles`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            moreActions();
        }
    );
};


function viewAllEmployees() {
    connection.query(
        `SELECT * FROM employees `,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            moreActions();
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
                    moreActions();
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
                            moreActions();
                        }
                    );
                })
        }
    );
};


function addEmployee() {
    connection.query(
        // grab managerList from employees table
        `SELECT * FROM employees WHERE role_id = 1`,
        function (err, results) {
            if (err) throw err;
            let managerList = results.map(manager => ({
                name: manager.first_name, value: manager.id
            }));
            console.log(managerList);

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
                                `INSERT INTO employees SET ?`,
                                {
                                    first_name: answers.empFirstName,
                                    last_name: answers.empLastName,
                                    role_id: answers.empRole,
                                    manager_id: answers.empManager
                                },
                                function (err, results) {
                                    if (err) throw err;
                                    console.log("New Employee Added");
                                    moreActions();
                                }
                            );
                        })
                }
            );
        }
    );
};


const updateEmp = () => {
    connection.query(
        'SELECT CONCAT(employees.first_name, " ",employees.last_name) AS full_name, employees.id as empl_id, roles.* FROM employees RIGHT JOIN roles on employees.role_id = roles.id',
        function (err, res) {
            if (err) throw err;
            let employeeList = res.map(employee => ({
                full_name: employee.full_name,
                id: employee.empl_id,
                value: [employee.full_name, employee.empl_id]
            }))

            let roleList = res.map(roles => ({
                title: roles.title,
                id: roles.id,
                value: [roles.title, roles.id]
            }));

            inquirer.prompt([{
                type: 'list',
                name: 'employee',
                choices: employeeList,
                message: 'Which employee would you like to edit?'
            },
            {
                type: 'list',
                name: 'newRole',
                choices: roleList,
                message: 'What role do you want to assign to this employee?'
            }
            ])
                .then((answer) => {
                    let editID = answer.employee[1];
                    let newRoleId = answer.newRole[1];
                    connection.query(`UPDATE employees SET role_id=${newRoleId} WHERE id=${editID};`,
                        function (err, res) {
                            if (err) {
                                throw err
                            }
                            console.table(res);
                            moreActions();
                        })
                }

                )
        })
};


promptUser();
