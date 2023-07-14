import { EmployerModel } from './employerModel';
import express from 'express';

export const createEmployer = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const employer = await EmployerModel.create(req.body);

		return res.status(200).json({
			message: 'Employer created successfully',
			data: {
				employer,
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

export const getAllEmployers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const employers = await EmployerModel.find();

		return res.status(200).json({
			message: 'List of all employers',
			data: {
				employers,
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

export const getEmployerById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const employer = await EmployerModel.findById(id).populate('interviewers', [
			'name',
			'email',
		]);

		return res.status(200).json({
			message: 'success',
			data: {
				employer,
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

export const updateEmployerById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const values = req.body;
		const employer = await EmployerModel.findByIdAndUpdate(id, values);
		// for adding new company
		return res.status(200).json({
			message: 'Employer successfully updated.',
			data: {
				employer,
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
