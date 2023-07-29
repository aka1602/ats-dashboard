import { EmployerModel } from '../employer/employerModel';
import { InterviewerModel } from './interviewerModel';
import express from 'express';

export const createInterviewer = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const companyId = req.body.companyName;
		const interviewer = await InterviewerModel.create(req.body);
		await EmployerModel.findOneAndUpdate(
			{ _id: companyId },
			{ $push: { interviewers: interviewer._id } }
		);
		return res.status(200).json({
			message: 'success',
			data: {
				interviewer,
			},
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({
				message: error,
			})
			.end();
	}
};

export const getAllInterviewers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const interviewers = await InterviewerModel.find();

		return res.status(200).json({
			message: 'success',
			data: {
				interviewers,
			},
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({
				message: error,
			})
			.end();
	}
};

export const getInterviewerById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const interviewer = await InterviewerModel.findById(id, req.body).populate(
			'companyName',
			['companyName', 'email']
		);

		return res.status(200).json({
			message: 'success',
			data: {
				interviewer,
			},
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({
				message: error,
			})
			.end();
	}
};

export const updateInterviewerById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const interviewer = await InterviewerModel.findByIdAndUpdate(id, req.body);

		return res.status(200).json({
			message: 'success',
			data: {
				interviewer,
			},
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({
				message: error,
			})
			.end();
	}
};

export const deleteInterviewerById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const interviewer = await InterviewerModel.findByIdAndDelete(id, req.body);

		return res.status(200).json({
			message: 'Deleted successfully',
			data: {
				interviewer,
			},
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({
				message: error,
			})
			.end();
	}
};
