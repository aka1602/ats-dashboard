import express from 'express';

import employees from './products/employee/employeesRouter';
import employers from './products/employer/employerRouter';
import interviewer from './products/interviewer/interviewerRouter';

const router = express.Router();
export default (): express.Router => {
	employees(router);
	employers(router);
	interviewer(router);
	return router;
};
