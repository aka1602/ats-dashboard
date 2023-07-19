import express from 'express';
import { jobCreate } from './jobController';
import { isLoggedIn } from '../../utils/common';

export default (router: express.Router) => {
	router.post('/job', isLoggedIn, jobCreate);
	return router;
};
