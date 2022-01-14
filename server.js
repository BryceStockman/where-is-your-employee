// const express = require('express');
const inquirer = require('inquirer');
const fs = require('fs');

// const PORT = process.env.PORT || 3001;
// const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Use apiRoutes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

const Employee = require('./lib/Employee');

const employeeData = [];
const departmentData = [];
const roleData = [];

// LOOK AT THE CHALLENGE SNAPSHOTS TO ADJUST THE INQUIRER PROMPTS
const promptUser = () => {
  inquirer
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
    ])
    .then((info) => {
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
      departmentData.push(department);

      if (info.addDepartment) {
        promptDepartment();
      } else {
        promptUser();
      }
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
      const { role } = info;
      roleData.push(role);

      if (info.addRole) {
        promptRole();
      } else {
        promptUser();
      }
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
        name: 'manager',
        message: "Who is this employee's manager? (Required)",
        validate: (managerInput) => {
          if (managerInput) {
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
      const { firstName, lastName, roleId, manager } = info;
      const employee = new Employee(firstName, lastName, roleId, manager);
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
        type: 'list',
        name: 'updateEmployee',
        message: "Which employee's role do you want to update? (Required)",
        choices: [
          // QUESTION: CAN I INSERT DATA IN HERE, IF SO, HOW?
        ],
        validate: (updateEmployeeInput) => {
          if (updateEmployeeInput) {
            return true;
          } else {
            console.log('Please enter what you would like to do');
            return false;
          }
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
      // QUESTION: I DON'T REALLY KNOW WHAT TO DO HERE
      const { updateEmployee, updateRole } = info;
      const updatedEmployee = new Employee(
        firstName,
        lastName,
        roleId,
        managerId
      );
      employeeData.push(employee);

      if (info.updateAnotherEmployee) {
        promptUpdateEmployee();
      } else {
        promptUser();
      }
    });
}

promptUser();

// app.listen(PORT, () => {
//   console.log(`API server now on port ${PORT}!`);
// });
