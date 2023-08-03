import express from 'express';
import {
	addCandidate,
	getCandidates,
	getJobById,
	jobCreate,
} from './jobController';
import { isLoggedIn } from '../../utils/common';

export default (router: express.Router) => {
	router.get('/job/hired/:id', getCandidates);
	router.get('/job/:id', getJobById);
	router.post('/job', isLoggedIn, jobCreate);
	router.patch('/job/:id', addCandidate);
	return router;
};
