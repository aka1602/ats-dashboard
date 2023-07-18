import express from 'express';
import { jobModel } from './jobModel';
import { get } from 'lodash';

export const jobCreate = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		let currentUserId: any = get(req, 'employer._id');
		if (!currentUserId) {
			return res.sendStatus(403);
		}
		currentUserId = String(currentUserId);
		const job = await jobModel.create({
			...req.body,
			employerId: currentUserId,
		});

		return res.sendStatus(201).json(job).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const getAllJobs = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const jobs = await jobModel.find();

		return res.sendStatus(200).json(jobs).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};
export const getJobById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;

		const job = await jobModel.findById(id);
		return res.sendStatus(200).json(job).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const updateJobById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;

		const job = await jobModel.findByIdAndUpdate(id, req.body);
		return res.sendStatus(200).json(job).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const deleteJobByID = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;

		const job = await jobModel.findByIdAndDelete(id);
		return res.sendStatus(200).json(job).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};
