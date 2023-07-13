"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employeeController_1 = require("./employeeController");
exports.default = (router) => {
    router.get('/employee', employeeController_1.getAllEmployees);
    router.post('/employee', employeeController_1.create);
    router.patch('/employee/:id', employeeController_1.updateEmployee);
    router.delete('/employee/:id', employeeController_1.deleteEmployee);
};
