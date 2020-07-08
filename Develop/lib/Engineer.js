// TODO: Write code to define and export the Employee class
const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.getGithub = () => {
            return this.github;
        }
        this.getRole = () => {
            return "Engineer";
        }
    }
}

module.exports = Engineer;