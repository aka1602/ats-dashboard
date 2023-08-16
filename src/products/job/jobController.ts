import express from 'express';
import { jobModel } from './jobModel';
import { EmployeeModel } from '../employee';

export const jobCreate = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		let currentUserId = req.params.userId;
		console.log(currentUserId);

		if (!currentUserId) {
			return res.status(401).json({
				message: 'Wrong Creditials',
			});
		}
		currentUserId = String(currentUserId);
		const job = await jobModel.create({
			...req.body,
			employerId: currentUserId,
		});

		return res.json(job).end();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			message: error,
		});
	}
};

export const getAllJobs = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const jobs = await jobModel.find();

		return res.status(200).json(jobs).end();
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
		return res.json(job).end();
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

export const addCandidate = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const data = req.body;

		const candidate = await EmployeeModel.create(data);
		await jobModel.findOneAndUpdate(
			{ _id: id },
			{
				$push: { Source: candidate._id },
			}
		);
		return res.json({
			message: 'Candidate added successfully',
		});
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getCandidates = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const fields = 'Source Hired Interview Applied Contacted Rejected';
		const data = await jobModel.findById(id, fields).populate(fields);

		return res.json(data);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const jobClosed = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		await jobModel.findByIdAndUpdate(id, { jobStatus: 'Closed' });

		return res.status(201).json({
			message: 'Job Closed successfully',
		});
	} catch (error) {
		return res.status(400).json({
			message: error,
		});
	}
};

export const importJob = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const oldJob = await jobModel.findById(id);
		if (!oldJob) {
			return res.status(400).json({
				message: 'Job does not exist',
			});
		}
		const {
			location,
			jobDescription,
			jobTitle,
			department,
			employmentType,
			senorityLevel,
			industryType,
			maxSalary,
			minSalary,
			workExperience,
			skills,
			Education,
			employerId,
		} = oldJob;

		const newJob = await jobModel.create({
			jobTitle,
			jobDescription,
			location,
			department,
			employmentType,
			employerId,
			senorityLevel,
			industryType,
			maxSalary,
			minSalary,
			workExperience,
			skills,
			Education,
		});

		return res.status(201).json({
			newJob,
		});
	} catch (error) {
		return res.status(400).json({
			message: error,
		});
	}
};
