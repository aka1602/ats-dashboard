import { isLoggedIn } from '../../utils/common';
import {
	signup,
	getAllEmployers,
	getEmployerById,
	updateEmployerById,
	login,
} from './employerController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employer', getAllEmployers);
	router.post('/employer', signup);
	router.get('/employer/:id', isLoggedIn, getEmployerById);
	router.patch('/employer/:id', updateEmployerById);
	router.post('/employer/login', login);
	//   router.delete("/:id", delel);
};
