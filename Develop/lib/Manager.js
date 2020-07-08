// TODO: Write code to define and export the Employee class
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.getOfficeNumber = () => {
            return this.officeNumber;
        }
        this.getRole = () => {
            return "Manager";
        }
    }
}

module.exports = Manager;