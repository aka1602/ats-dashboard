import express from 'express';

import { employeeRoutes } from './products/employee';

const router = express.Router();
export default (): express.Router => {
	employeeRoutes(router);
	return router;
};
