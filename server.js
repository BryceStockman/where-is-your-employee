const express = require('express');
const inquirer = require('inquirer');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

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
      // THIS SHOULD BE A LIST OF ROLES FOR THE USER TO CHOOSE
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
      // THIS SHOULD BE A INPUT ASKING WHO IS THE MANAGER
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
      console.log(info);
      // QUESTION: HOW DO I CONVERT THE BOOLEAN TRUE TO THE NUMBER MYSQL IS LOOKING FOR?
      const { firstName, lastName, roleId, managerId } = info;
      const employee = new Employee(firstName, lastName, roleId, managerId);
      console.log(employee);
      employeeData.push(employee);

      if (info.confirmAddEmployee) {
        promptEmployee();
      } else {
        console.log('moving on, need to decide what to do here');
      }
    });
};
// promptEmployee();



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});