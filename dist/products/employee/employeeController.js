"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getAllEmployees = exports.getEmployee = exports.create = void 0;
const employeeModal_1 = require("./employeeModal");
// Create a new employee
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployee = yield (0, employeeModal_1.createEmployee)(req.body);
        return res.status(200).json({ data: newEmployee }).end();
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error }).end();
    }
});
exports.create = create;
// Get an employee by email
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const employee = yield (0, employeeModal_1.getEmployeeByEmail)(email);
        return res.status(200).json({ data: employee }).end();
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error }).end();
    }
});
exports.getEmployee = getEmployee;
// Get all employees
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, employeeModal_1.getEmployees)();
        return res.status(200).json({ data: employees }).end();
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error }).end();
    }
});
exports.getAllEmployees = getAllEmployees;
// Update an employee by ID
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const values = req.body;
        const updatedEmployee = yield (0, employeeModal_1.updateEmployeeById)(id, values);
        return res.status(200).json({ data: updatedEmployee }).end();
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error }).end();
    }
});
exports.updateEmployee = updateEmployee;
// Delete an employee by email
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, values } = req.body;
        const deletedEmployee = yield (0, employeeModal_1.deleteEmployeeById)(email);
        return res
            .status(200)
            .json({ message: 'Employee is deleted', data: deletedEmployee })
            .end();
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error }).end();
    }
});
exports.deleteEmployee = deleteEmployee;
