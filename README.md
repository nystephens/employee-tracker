# Employee Tracker Database

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions)

## Description
The Employee Tracker Database is a Node.js application that allows an employer to create and interact with an employee database.  

## Installation
Instructions for installation are as follows: 

1.  This application uses MySQL to create the employee_tracker database and its tables.  To download MySQL for Windows please use this link [MySQL For Windows](https://dev.mysql.com/downloads/windows/installer/8.0.html).  To download MySQL for Mac please use this link [MySQL For Mac](https://dev.mysql.com/downloads/mysql/).  Once your program is downloaded you will be able to create, veiw, and edit your employee_tracker database as well as create your own custom databases.

2.  Navigate to the GitHub repository ( https://github.com/nystphens/employee-tracker ) in your web browser and click the green dropdown menu that says “Code”.  Copy the SSH key to your clipboard and then open your terminal.  

3.  In your terminal navigate to the directory you wish to house this repository.   

4.  Type “git clone” into your command line and paste the SSH key you copied from the repository, then hit Enter.  A new file titled “employee-tracker” containing the necessary files will appear in your chosen directory.  Due to file size, Node.js and is necessary  modules will not be cloned to your repository.  Please continue reading the instructions to find out how to install these modules on your computer.   

5.  Since this application uses Node.js you will have to install Node and the required Node modules to operate it.  For detailed instructions on how  to install Node.js to your computer please visit: https://www.guru99.com/download-install-node-js.html  

6.  Once Node is successfully installed on your computer, navigate to the index.js file in your terminal.  For quick access you can right click index.js in VS Code and click the option “Open in Integrated Terminal”. 

7.  Type the following command to install the proper node modules: “npm install”.  

8.  Check your newly downloaded “node_modules” folder to ensure that the correct packages have been installed.  The dependencies that are not included within the general Node module package are “inquirer”, "mysql2", and "console.table".  If these packages are not present within your Node modules then run the command “npm install inquirer mqsql2 console.table” to install them.  

9.  Once you have cloned the repository and downloaded Node.js and its necessary modules you are ready to use the Employee Tracker!  


## Usage
To initialize the employee_tracker database first log into your MySQL CLI by entering the command "mysql -u root -p" while in the root directory of your CLI.  You will be prompted to enter your password.  You will also need to enter your password into the "password" section of the database connection at the top of index.js.  Once you have entered your password you will be in the MySQL CLI.  Run the command "source schema.sql" followed by "source seeds.sql" to populate the employee_tracker database.  You may then exit the MySQL CLI by entering the command "quit".

Created using Node.js, this application runs entirely within the command line.  To initiate the application first navigate to the correct directory in your terminal (see Installation Step 5), type the following command, and hit Enter:  “node index.js”.  When the user runs the application in their terminal they are met with a set of prompts initiated by the inquirer module that ask the user for actions to interact with thier employee database.  the options for interaction are: "View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Exit Program".  When the user selects a veiwing option they are presented with an ordered table with info relevant to their request.  If the user selects an option to edit the table by entering a new employee, role, department, or update an employee's role then they are asked for input regarding their addition.  Selecting "Exit Program" will terminated the connection to the database and return the user to the CLI.  After an action is completed the user is asked if they would like to take more actions.  If they choose "Yes" then they will be again prompted with all options for interaction.  If the user selects no then the connection to the database is terminated and the user returns to the CLI.

To see this application in action please watch my [Demo Video](https://drive.google.com/file/d/1mc9TIf2UDI_uzq7blYf5L9QY2DDMBb3d/view)

## License
![MIT license](https://img.shields.io/badge/license-MIT-brightgreen)
[MIT license](https://opensource.org/licenses/MIT)
Copyright <YEAR> <COPYRIGHT HOLDER>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing
If you would like to contribute see instructions above for cloning the repo and installation.  Some additional features I would like to include in the future would be to delete selected fields in the tables.  I would like to also include an option for viewing the total budget for salary by adding up all the salaries.

## Tests
To test the application run the different commands that you want to test and enter values for test subjects.  You can insert console.log's along the way to check data flow and persistance. 

## Questions
For questions or concerns regarding this project or future collaborations please contact the author via GitHub at:
https://github.com/nystephens
