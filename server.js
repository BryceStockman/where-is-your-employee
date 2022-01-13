const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./lib/Employee');

const employeeData = [];

const promptEmployee = () => {
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
        type: 'confirm',
        name: 'managerId',
        message: "What is the team employee's manager id? (Required)",
        validate: (managerIdInput) => {
          if (managerIdInput) {
            return true;
          } else {
            console.log("Please enter the employee's manager id");
            return false;
          }
        },
      },
    ])
    .then((info) => {
      console.log(info);
      const { firstName, lastName, roleId, managerId } = info;
      const employee = new Employee(firstName, lastName, roleId, managerId);
      console.log(employee);
      employeeData.push(employee);
    });
};

promptEmployee();
