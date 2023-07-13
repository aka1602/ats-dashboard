import express from 'express';

<<<<<<< HEAD
import employees from './products/employee/employeesRouter';
import employers from './products/employer/employerRouter';
import interviewer from './products/interviewer/interviewerRouter';

const router = express.Router();
export default (): express.Router => {
	employees(router);
	employers(router);
	interviewer(router);
=======
import { employeeRoutes } from './products/employee';

const router = express.Router();
export default (): express.Router => {
	employeeRoutes(router);
>>>>>>> aa2e957c60dceb15172d66f7b91d69148f4a58f7
	return router;
};
