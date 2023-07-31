import { isLoggedIn } from '../../utils/common';
import {
	signup,
	getAllEmployers,
	getEmployerById,
	updateEmployerById,
	login,
	createUser,
} from './employerController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employer', getAllEmployers);
	router.post('/employer', signup);
	router.post('/employer/login', login);
	router.patch('/employer/user', isLoggedIn, createUser);
	router.get('/employer/:id', isLoggedIn, getEmployerById);
	router.patch('/employer/:id', updateEmployerById);
	//   router.delete("/:id", delel);
};
