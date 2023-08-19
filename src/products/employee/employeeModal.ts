import mongoose from 'mongoose';
import validator from 'email-validator';

const employeeSchema = new mongoose.Schema({
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
			validator: (v: string) => validator.validate(v),
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
	resume: {
		type: String,
	},
});

export const EmployeeModel = mongoose.model('Employees', employeeSchema);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEmployee = (values: Record<string, any>) =>
	new EmployeeModel(values).save().then((employee) => employee.toObject());

export const getEmployees = () => EmployeeModel.find();

export const getEmployeeByEmail = (email: string) =>
	EmployeeModel.findOne({ email });

export const deleteEmployeeById = (id: string) =>
	EmployeeModel.findByIdAndDelete(id);

export const updateEmployeeById = (id: string, values: Record<string, any>) =>
	EmployeeModel.findByIdAndUpdate(id, values);
