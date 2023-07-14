import {
	createEmployer,
	getAllEmployers,
	getEmployerById,
	updateEmployerById,
} from './employerController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employer', getAllEmployers);
	router.post('/employer', createEmployer);
	router.get('/employer/:id', getEmployerById);
	router.patch('/employer/:id', updateEmployerById);
	//   router.delete("/:id", delel);
};
