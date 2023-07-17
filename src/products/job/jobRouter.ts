import express from 'express';
import { isAuthenticated } from '../../utils/common';

export default (router: express.Router) => {
	router.post('/job', isAuthenticated);
	return router;
};
