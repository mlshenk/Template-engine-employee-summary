const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeesArr = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addEmployee() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: ["Add your Manager", "Add an Intern", "Add an Engineer", "Generate Team"]
    }).then(function ({ choice }) { 
        switch (choice) {
            case "Add your Manager":
                // Controls to prevent multiple managers
                console.log(employeesArr);
                 
                let [hasManager] = employeesArr.filter(emp => emp.officeNumber)
                console.log("Do you have a manager?", hasManager);
                if (hasManager?.officeNumber) {
                    console.log("You've already added a manager!");
                    addEmployee();   
                    break;
                } else {
                    addManager();
                    break
                }

            case "Add an Engineer":
                addEngineer();
                break;

            case "Add an Intern":
                addIntern();
                break;

            case "Generate Team":
                console.log("Generating your team page...")
                fs.writeFile(outputPath, render(employeesArr), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Successfully Written TeamPage, check your output folder");
                })
                break;

        }
    })
}

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Manager's name:",
            name: "name"
        }, {
            type: "input",
            message: "Please enter the Manager's ID #:",
            name: "id"
        }, {
            type: "input",
            message: "Please enter the Manager's email:",
            name: "email"
        }, {
            type: "input",
            message: "Please enter the Manager's office number:",
            name: "officeNumber"
        }
    ]).then(function (answers) {
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        employeesArr.push(newManager)
        // console.log(employees);
        addEmployee();
    })
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Engineer's name:",
            name: "name"
        }, {
            type: "input",
            message: "Please enter the Engineer's ID #:",
            name: "id"
        }, {
            type: "input",
            message: "Please enter the Engineer's email:",
            name: "email"
        }, {
            type: "input",
            message: "Please enter the Engineer's GitHub username:",
            name: "github"
        }
    ]).then(function (answers) {
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        employeesArr.push(newEngineer)
        // console.log(employees);
        addEmployee();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Intern's name:",
            name: "name"
        }, {
            type: "input",
            message: "Please enter the Intern's ID #:",
            name: "id"
        }, {
            type: "input",
            message: "Please enter the Intern's email:",
            name: "email"
        }, {
            type: "input",
            message: "Please enter the Intern's school:",
            name: "school"
        }
    ]).then(function (answers) {
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
        employeesArr.push(newIntern)
        // console.log(employees);
        addEmployee();
    })
}


// officeArray.push(newManager, newEngineer, newIntern);
//     console.log(answers.officeArray);

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
addEmployee();