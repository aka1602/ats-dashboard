import express from 'express';
import { isAuthenticated } from '../../utils/common';
import { jobCreate } from './jobController';

export default (router: express.Router) => {
	router.post('/job', isAuthenticated, jobCreate);
	return router;
};
