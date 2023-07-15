import {
	register,
	getAllEmployers,
	getEmployerById,
	updateEmployerById,
	login,
} from './employerController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employer', getAllEmployers);
	router.post('/employer', register);
	router.get('/employer/:id', getEmployerById);
	router.patch('/employer/:id', updateEmployerById);
	router.post('/employer/login', login);
	//   router.delete("/:id", delel);
};
