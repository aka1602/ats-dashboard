import upload from '../../utils/imageConfig';
import {
	addResume,
	create,
	deleteEmployee,
	getAllEmployees,
	updateEmployee,
} from './employeeController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employee', getAllEmployees);
	router.post('/employee', upload.single('resume'), create);
	router.post('/employee/:id/resume', upload.single('resume'), addResume);
	router.patch('/employee/:id', updateEmployee);
	router.delete('/employee/:id', deleteEmployee);
};
