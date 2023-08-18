import { isLoggedIn, isVerifiedEmployer } from '../../utils/common';
import {
	signup,
	getAllEmployers,
	getEmployerById,
	updateEmployerById,
	login,
	createUser,
	loginUser,
	deleteEmployer,
	verifyEmployer,
} from './employerController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/employer', getAllEmployers);
	router.delete('/employer/:id', deleteEmployer);
	router.post('/employer', signup);
	router.post('/employer/login', login);
	router.patch('/employer/user', isLoggedIn, isVerifiedEmployer, createUser);
	router.post('/employer/user/login', loginUser);
	router.get('/employer/:id', isLoggedIn, isVerifiedEmployer, getEmployerById);
	router.patch('/employer/:id', updateEmployerById);
	router.get('/employer/verify/:id', verifyEmployer);
	//   router.delete("/:id", delel);
};
