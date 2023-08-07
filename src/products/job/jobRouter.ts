import express from 'express';
import {
	addCandidate,
	getCandidates,
	getJobById,
	importJob,
	jobClosed,
	jobCreate,
} from './jobController';
import { isLoggedIn } from '../../utils/common';

export default (router: express.Router) => {
	router.post('/job', isLoggedIn, jobCreate);
	router.get('/job/hired/:id', getCandidates);
	router.post('/job/import/:id', isLoggedIn, importJob);
	router.patch('/job/close/:id', isLoggedIn, jobClosed);
	router.get('/job/:id', getJobById);
	router.patch('/job/:id', addCandidate);
	return router;
};
