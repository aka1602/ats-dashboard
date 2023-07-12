"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeById = exports.deleteEmployeeById = exports.getEmployeeByEmail = exports.getEmployees = exports.createEmployee = exports.EmployeeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const email_validator_1 = __importDefault(require("email-validator"));
const employeeSchema = new mongoose_1.default.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    dateOfApplication: {
        type: String,
        required: true,
    },
    sourceOfApplication: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email should be present'],
        lowercase: true,
        validate: {
            validator: (v) => email_validator_1.default.validate(v),
            message: 'Invalid email address',
        },
    },
    phone: {
        type: String,
        required: true,
    },
    currentLocation: {
        type: String,
        required: true,
    },
    preferredLocation: {
        type: String,
        required: true,
    },
    totalExperience: {
        type: Number,
        required: true,
        min: 0,
    },
    relevantExperience: {
        type: Number,
        min: 0,
    },
    reasonForChange: {
        type: String,
    },
    currentCompanyName: String,
    currentCompanyDesignation: String,
    Department: {
        type: String,
    },
    Role: String,
    Industry: String,
    skills: {
        type: [String],
    },
    ctc: {
        type: Number,
    },
    expectedCtc: {
        type: Number,
        required: true,
    },
    noticePeriod: {
        type: String,
        required: true,
    },
    lastWorkingDay: {
        type: String,
    },
    underGraduateDegree: {
        type: String,
        required: true,
    },
    ugSpecialization: {
        type: String,
    },
    postGraduationDegree: {
        type: String,
    },
    pgSpecialization: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
    martialStatus: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
    },
    homeCity: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
});
exports.EmployeeModel = mongoose_1.default.model('Employees', employeeSchema);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createEmployee = (values) => new exports.EmployeeModel(values).save().then((employee) => employee.toObject());
exports.createEmployee = createEmployee;
const getEmployees = () => exports.EmployeeModel.find();
exports.getEmployees = getEmployees;
const getEmployeeByEmail = (email) => exports.EmployeeModel.findOne({ email });
exports.getEmployeeByEmail = getEmployeeByEmail;
const deleteEmployeeById = (id) => exports.EmployeeModel.findByIdAndDelete(id);
exports.deleteEmployeeById = deleteEmployeeById;
const updateEmployeeById = (id, values) => exports.EmployeeModel.findByIdAndUpdate(id, values);
exports.updateEmployeeById = updateEmployeeById;
