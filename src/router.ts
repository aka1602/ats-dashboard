import express from 'express';

import { employeeRoutes } from './products/employee';
import { employerRoutes } from './products/employer';

const router = express.Router();
export default (): express.Router => {
	employeeRoutes(router);
	employerRoutes(router);
	return router;
};
