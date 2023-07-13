import {
	create,
	deleteEmployee,
	getAllEmployees,
	updateEmployee,
} from './employeeController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employee', getAllEmployees);
	router.post('/employee', create);
	router.patch('/employee/:id', updateEmployee);
	router.delete('/employee/:id', deleteEmployee);
};
