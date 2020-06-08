const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// 1.  have a big function
// 2. then call function that asks  for what role of employe
// 3. calls a function to create manger/create intern/create engineer
// 4. if employee === intern, call createIntern function
// 5. if employee === engineer, call createEngineer function
// 6. if employee === manager, call createManager function
var team = [];

function printHTML() {
    console.log("team: ", team)
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team));
}

function start() {

    pickRole()
    // function pick a role

    // send the team data
    // Create the output directory if the output path doesn't exist

}

function pickRole() {
    inquirer.prompt([{
        // multiple choice roles
        type: 'list',
        name: 'role',
        message: `What's your role?`,
        choices: [`Manager`, `Employee`, `Intern`, `Engineer`, 'end']
    }]).then(answers => {
        console.log(answers)
        if (answers.role === 'Manager') {
            createManager();

        }
        if (answers.role === 'end') {
            printHTML();
        }
        // if (answers.role === 'Intern') {

        // }
        // if (answers.role === 'Engineer') {

        // }
        // then call a function  that gets the rest of the team, no more managers
    })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {
    inquirer.prompt([{
        type: 'input',
        name: 'managerName',
        message: "What is your name?"
    }, {
        type: 'input',
        name: 'managerId',
        message: "What is your ID?"
    }, {
        type: 'input',
        name: 'managerEmail',
        message: "What is your Email?"
    }, {
        type: 'input',
        name: 'managerOfficeNumber',
        message: "What is your Office Number?"
    }]).then(answers => {
        const newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        team.push(newManager);
        console.log(team)
        pickRole();
        // then call a function  that gets the rest of the team, no more managers
    })
}
// createManager();
start();


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