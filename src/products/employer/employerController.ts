import { EmployerModel } from './employerModel';
import express from 'express';
import { authentication, random } from '../../utils/common';

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

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, name } = req.body;

		if (!password || !email) {
			return res.sendStatus(403);
		}

		const existingUser = await EmployerModel.findOne({ email });
		if (existingUser) {
			return res.sendStatus(400);
		}

		const salt: string = random();
		const {
			role,
			phone,
			companyName,
			industry,
			designation,
			pincode,
			address,
		} = req.body;

		const employer = await EmployerModel.create({
			name,
			email,
			authentication: {
				password: authentication(salt, password),
				salt,
			},
			role,
			phone,
			companyName,
			industry,
			designation,
			pincode,
			address,
		});

		return res.sendStatus(200).json(employer).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.sendStatus(400);
		}

		const user = await EmployerModel.findOne({ email }).select(
			'+authentication.salt +authentication.password'
		);

		if (!user || !user.authentication || !user.authentication.salt) {
			return res.sendStatus(400);
		}

		const exprectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password !== exprectedHash) {
			return res.sendStatus(400);
		}

		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString()
		);

		await user.save();

		res.cookie('AUTH-COOKIE', user.authentication.sessionToken, {
			domain: 'localhost',
			path: '/',
		});

		return res
			.status(200)
			.json({
				message: 'logged in',
			})
			.end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
