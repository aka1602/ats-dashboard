import express from 'express';
import {
	createEmployee,
	getEmployeeByEmail,
	getEmployees,
	updateEmployeeById,
	deleteEmployeeById,
	EmployeeModel,
} from './employeeModal';

// Create a new employee
export const create = async (req: express.Request, res: express.Response) => {
	try {
		const newEmployee = await createEmployee({ ...req.body });
		return res.status(200).json({ data: newEmployee }).end();
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: error }).end();
	}
};

// Get an employee by email
export const getEmployee = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { email } = req.body;
		const employee = await getEmployeeByEmail(email);
		return res.status(200).json({ data: employee }).end();
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: error }).end();
	}
};

// Get all employees
export const getAllEmployees = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const employees = await getEmployees();

		return res.status(200).json({ data: employees }).end();
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: error }).end();
	}
};

// Update an employee by ID
export const updateEmployee = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const values = req.body;
		const updatedEmployee = await updateEmployeeById(id, values);
		return res.status(200).json({ data: updatedEmployee }).end();
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: error }).end();
	}
};

// Delete an employee by email
export const deleteEmployee = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { email } = req.body;
		const deletedEmployee = await deleteEmployeeById(email);
		return res
			.status(200)
			.json({ message: 'Employee is deleted', data: deletedEmployee })
			.end();
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: error }).end();
	}
};

// add resume to upload
export const addResume = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		// console.log(req.file?.filename);

		await EmployeeModel.findByIdAndUpdate(id, { resume: req.file?.filename });
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
