var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Changeme123",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
});

async function promptUser() {
    const doNext = await inquirer.prompt([
        {
            type: "list",
            name: "mainChoices",
            message: "Welcome to the employee tracker! What would you like to do?",
            choices: ["Add", "View", "Update"]
        }
    ]);
    switch (doNext.mainChoices) {
        case ("Add"):
            const addNew = await inquirer.prompt([
                {
                    type: "list",
                    name: "addChoices",
                    message: "What did you want to add?",
                    choices: ["Department", "Roles", "Employee"]
                }
            ])
            .then(function(answer) {
                // based on their answer, either call the bid or the post functions
                if (answer.addChoices === "Department") {
                    createDepartment();
                }
                else if(answer.addChoices === "Roles") {
                  createRole();
                } else{
                  createEmployee();
                }
              });
            
            break;
        case ("View"):
            const viewAll = await inquirer.prompt([
                {
                    type: "list",
                    name: "viewQuestions",
                    message: "What would you like to view?",
                    choices: ["Departments", "Roles", "Employees"]
                }
            ]);
            console.log(viewAll);
            if (viewAll.viewQuestions === "Departments") {
                viewDepartment();
            } else if (viewAll.viewQuestions === "Roles") {
                viewRoles();
            }
            else {
                viewEmployees();
            }
            break;
    }
};

function createDepartment() {
    inquirer
    .prompt([
      {
        name: "newDepartmentName",
        type: "input",
        message: "What is the name of the new department?"
      }
    ])
    .then(function(answer) {
        var departName = answer.newDepartmentName;
        console.log(departName)
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {name: answer.newDepartmentName}, 
        
        function(err) {
          if (err) throw err;
          console.log("You created a new department!");
          // re-prompt the user for if they want to bid or post
          promptUser();
        }
      );
    });
}

function createRole() {
    inquirer
    .prompt([
      {
        name: "newRoleTitle",
        type: "input",
        message: "What is the title of the new role?"
      },
      {
        name: "newRoleSalary",
        type: "input",
        message: "What is the salary of the new role? (ex. 10000.00)"
      },
      {
        name: "newRoleDepartment",
        type: "input",
        message: "What is the department ID?"
      }
    ])
    .then(function(answer) {
        var roleTitle = answer.newRoleTitle;
        console.log(roleTitle);
        var roleSalary = answer.newRoleSalary;
        console.log(roleSalary);
        var roleDepartment = answer.newRoleDepartment;
        console.log(roleDepartment);
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {   
            title: answer.newRoleTitle,
            salary: answer.newRoleSalary,
            department_id: answer.newRoleDepartment
        }, 
        
        function(err) {
          if (err) throw err;
          console.log("You created a new role!");
          // re-prompt the user for if they want to bid or post
          promptUser();
        }
      );
    });
}

function createEmployee() {
    inquirer
    .prompt([
      {
        name: "firstNameEmployee",
        type: "input",
        message: "What is your first name?"
      },
      {
        name: "lastNameEmployee",
        type: "input",
        message: "What is your last name?"
      },
      {
        name: "roleIdEmployee",
        type: "input",
        message: "What is your role ID?"
      },
      {
        name: "managerIdEmployee",
        type: "input",
        message: "What is your manager ID?"
      }
    ])
    .then(function(answer) {
        var firstNameEmployee = answer.firstNameEmployee;
        console.log(firstNameEmployee);
        var lastNameEmployee = answer.lastNameEmployee;
        console.log(lastNameEmployee);
        var roleIdEmployee = answer.roleIdEmployee;
        console.log(roleIdEmployee);
        var managerIdEmployee = answer.managerIdEmployee;
        console.log(managerIdEmployee);
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {   
            first_name: answer.firstNameEmployee,
            last_name: answer.lastNameEmployee,
            role_id: answer.roleIdEmployee,
            manager_id: answer.managerIdEmployee
        }, 
        
        function(err) {
          if (err) throw err;
          console.log("You created a new employee!");
          // re-prompt the user for if they want to bid or post
          promptUser();
        }
      );
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: "department",
                  type: "list",
                  choices: function () {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].name);
                      }
                      return choiceArray;
                  },
                  // message: "What Department would you like to update?"
              }
          ])
          .then(function (answer) {
              console.table(res)
              updateEmployee(answer.department)
          })
  })
}


function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "employees",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].last_name);
                        }
                        return choiceArray;
                    },
                    // message: "What employee would you like to update?"
                }
            ])
            .then(function (answer) {
                console.table(res)
                updateEmployee(answer.employees)
            })
    })
}
