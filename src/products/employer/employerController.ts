import { EmployerModel } from './employerModel';
import express from 'express';
import { comparePassword, hashPassword } from '../../utils/common';
import jwt from 'jsonwebtoken';
import { Email } from '../../utils/mailService';

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

export const signup = async (req: express.Request, res: express.Response) => {
	try {
		req.body.password = await hashPassword(req.body.password);
		const employer = await EmployerModel.create(req.body);

		const url = `${req.protocol}://${req.get('host')}/me`;
		await new Email(employer, url).sendWelcome();
		return res.json({
			message: 'User signed up',
			data: employer,
		});
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) throw new Error('unsufficent data');

		const employer = await EmployerModel.findOne({ email }).select('+password');
		const hash = employer?.password;
		console.log(hash);

		if (!hash) {
			return res.sendStatus(400).end();
		} else {
			const result = await comparePassword(password, hash);
			if (!result) {
				return res
					.json({
						message: 'Wrong Creditanls',
					})
					.end();
			} else {
				const uid = employer._id;
				const token = await jwt.sign(
					{ payload: uid },
					`${process.env.SECRET_KEY}`,
					{
						expiresIn: '10m',
					}
				);

				res.cookie('login', token, { httpOnly: true });
				return res.json({
					message: 'User logged in',
				});
			}
		}
	} catch (error) {
		console.log(error);

		res
			.sendStatus(401)
			.json({
				message: 'ERROR',
			})
			.end();
	}
};
