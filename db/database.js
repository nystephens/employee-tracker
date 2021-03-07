const inquirer = require('inquirer');
const mysql = require('mysql2');
const format = require('console.table');
const index = require('../index');
const moreActions = require('../index');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker'
});



function viewAllDepartments() {
    connection.query(
        `SELECT * FROM departments`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            // moreActions();
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
        `SELECT * FROM employees `,
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
    // STEP ONE CREATE DEPARTMENTLIST FROM DEPARTMENTS TABLE
    connection.query(
        `SELECT * FROM departments`,
        function (err, results) {
            if (err) throw err;

            let departmentList = results.map(department => ({
                name: department.department_name, value: department.id
            }));

            // STEP TWO ask questions for new role 
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
                // STEP THREE insert new role answers into table using INSERT INTO 
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
                        })
                }

                )
        })
};


module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllRoles: viewAllRoles,
    viewAllDepartments: viewAllDepartments,
    addEmployee: addEmployee,
    addRole: addRole,
    addDepartment: addDepartment,
    updateEmp: updateEmp
};

