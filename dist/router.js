"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = require("./products/employee");
const router = express_1.default.Router();
exports.default = () => {
    (0, employee_1.employeeRoutes)(router);
    return router;
};
