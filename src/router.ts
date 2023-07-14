import express from 'express';

import { employeeRoutes } from './products/employee';
import { employerRoutes } from './products/employer';
import { interviewerRoutes } from './products/interviewer';

const router = express.Router();
export default (): express.Router => {
	employeeRoutes(router);
	employerRoutes(router);
	interviewerRoutes(router);
	return router;
};
