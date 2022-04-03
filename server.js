require('dotenv').config();
const db = require('./db/connection');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee');

function start() {
  promptUser();
}

const promptUser = async () => {
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do? (Required)',
        choices: [
          'Add Department',
          'Add Role',
          'Add Employee',
          "Update Employee's Role",
          'Finish',
        ],
        validate: (toDoInput) => {
          if (toDoInput) {
            return true;
          } else {
            console.log('Please enter what you would like to do');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'test',
        message: 'add something',
      },
    ])
    .then((info) => {
      console.log('.then');
      const toDo = info.toDo;
      if (toDo === 'Add Department') {
        promptDepartment();
      } else if (toDo === 'Add Role') {
        promptRole();
      } else if (toDo === 'Add Employee') {
        promptEmployee();
      } else if (toDo === "Update Employee's Role") {
        promptUpdateEmployee();
      } else {
        console.log(employeeData);
        console.log(departmentData);
        console.log(roleData);
      }
    });
};

const promptDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department? (Required)',
        validate: (departmentInput) => {
          if (departmentInput) {
            return true;
          } else {
            console.log('Please enter what department you would like to add');
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'addDepartment',
        message: 'Would you like to add another department? (Required)',
        validate: (addDepartmentInput) => {
          if (addDepartmentInput) {
            return true;
          } else {
            console.log('Please confirm');
            return false;
          }
        },
      },
    ])
    .then((info) => {
      const { department } = info;
      // MYSQL INSERT INTO TABLE
      const sql = `INSERT INTO department (name)
      VALUES (${department});`;

      db.query(sql, (err, res) => {
        console.log('data added to table');
        if (err) {
          console.log(err);
        } else if (info.addDepartment) {
          promptDepartment();
        } else {
          promptUser();
        }
      });
    });
};

const promptRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role',
        message: 'What role you would like to add? (Required)',
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log('Please enter what role you would like to add');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is that role's salary? (Required)",
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log('Please enter a salary');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'departmentId',
        message: "What is that role's department id? (Required)",
        validate: (departmentIdInput) => {
          if (departmentIdInput) {
            return true;
          } else {
            console.log('Please enter a department ID');
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'addRole',
        message: 'Would you like to add another role? (Required)',
        validate: (addRoleInput) => {
          if (addRoleInput) {
            return true;
          } else {
            console.log('Please confirm');
            return false;
          }
        },
      },
    ])
    .then((info) => {
      const { role, salary, departmentId } = info;
      // MYSQL INSERT INTO TABLE
      const sql = `INSERT INTO role (title, salary, department_id)
      VALUES (${role}, ${salary}, ${departmentId});`;

      db.query(sql, (err, res) => {
        console.log('data added to table');
        if (err) {
          console.log(err);
        } else if (info.addDepartment) {
          promptRole();
        } else {
          promptUser();
        }
      });
    });
};

function promptEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the team employee's first name? (Required)",
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("Please enter the employee's first name");
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the team employee's last name? (Required)",
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log("Please enter the employee's last name");
            return false;
          }
        },
      },
      {
        type: 'number',
        name: 'roleId',
        message: "What is the team employee's role id? (Required)",
        validate: (roleIdInput) => {
          if (roleIdInput) {
            return true;
          } else {
            console.log("Please enter the employee's role id");
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'managerId',
        message: "What is the manager's ID? (Required)",
        validate: (managerIdInput) => {
          if (managerIdInput) {
            return true;
          } else {
            console.log('Please confirm');
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add another employee? (Required)',
        validate: (managerIdInput) => {
          if (managerIdInput) {
            return true;
          } else {
            console.log(
              'Please confirm if you would like to add another employee'
            );
            return false;
          }
        },
      },
    ])
    .then((info) => {
      // QUESTION: HOW DO I CONVERT THE BOOLEAN TRUE TO THE NUMBER MYSQL IS LOOKING FOR?
      const { firstName, lastName, roleId, managerId } = info;
      const employee = new Employee(firstName, lastName, roleId, managerId);
      employeeData.push(employee);

      if (info.confirmAddEmployee) {
        promptEmployee();
      } else {
        promptUser();
      }
    });
}

function promptUpdateEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'updateEmployee',
        message: "What is the employee's id? (Required)",
        validate: (updateEmployeeInput) => {
          db.query(
            `SELECT * FROM employee WHERE employee.id = ${updateEmployeeInput}`,
            (err, res) => {
              if (err) {
                console.log('Please enter a valid ID');
                return false;
              } else {
                return true;
              }
            }
          );
        },
      },
      {
        type: 'input',
        name: 'updateEmployeeRole',
        message: "What is the employee's role? (Required)",
        validate: (updateRoleInput) => {
          if (updateRoleInput) {
            return true;
          } else {
            console.log("Please enter the employee's role");
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'updateAnotherEmployee',
        message: "Would you like to update another employee's role? (Required)",
        validate: (anotherEmployeeInput) => {
          if (anotherEmployeeInput) {
            return true;
          } else {
            console.log('Please confirm');
            return false;
          }
        },
      },
    ])
    .then((info) => {
      const { firstName, lastName, roleId, managerId } = info;
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (${firstName}, ${lastName}, ${roleId}, ${managerId});`;

      db.query(sql, (err, res) => {
        console.log('data added to table');
        if (err) {
          console.log(err);
        } else if (info.updateAnotherEmployee) {
          promptEmployee();
        } else {
          promptUser();
        }
      });
    });
}

start();
