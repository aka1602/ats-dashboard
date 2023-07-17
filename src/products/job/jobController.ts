import express from 'express';
import { jobModel } from './jobModel';

export const jobCreate = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const job = await jobModel.create();

		return res.sendStatus(201).json(job).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};
