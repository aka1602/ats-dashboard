import express from 'express';

import { employeeRoutes } from './products/employee';
import { employerRoutes } from './products/employer';
import jobRouter from './products/job/jobRouter';

const router = express.Router();
export default (): express.Router => {
	employeeRoutes(router);
	employerRoutes(router);
	jobRouter(router);
	return router;
};
