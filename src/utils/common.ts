import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { EmployerModel } from '../products/employer';

export const hashPassword = async (pasword: string): Promise<string> => {
	pasword = await bcrypt.hash(pasword, 10);

	return pasword;
};

export const comparePassword = async (
	password: string,
	hash: string
): Promise<boolean> => await bcrypt.compare(password, hash);

export const isLoggedIn = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const token = req.cookies.login;
		if (!token) {
			return res
				.json({
					message: 'Please logged in',
				})
				.end();
		} else {
			const payload = jwt.verify(token, `${process.env.SECRET_KEY}`);

			if (typeof payload === 'object') {
				const id = payload.payload;
				// const employer = await EmployeeModel.findById(id);
				req.params.userId = id;
				next();
			} else {
				return res
					.json({
						message: 'User not found',
					})
					.end();
			}
		}
	} catch (error) {
		console.log(error);
		return res
			.json({
				message: 'ERROR',
			})
			.end();
	}
};

export const isLoggedUserIn = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const token = req.cookies.login;
		console.log(token);
		if (!token) {
			return res
				.json({
					message: 'Please logged in',
				})
				.end();
		} else {
			const payload = jwt.verify(token, `${process.env.SECRET_KEY}`);

			if (typeof payload === 'object') {
				const user = payload.payload;
				req.params.user = user;
				next();
			} else {
				return res
					.json({
						message: 'User not found',
					})
					.end();
			}
		}
	} catch (error) {
		console.log(error);
		return res
			.json({
				message: 'ERROR',
			})
			.end();
	}
};
// used to check the Employer verification
export const isVerifiedEmployer = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const id = req.params.userId;
		const employer = await EmployerModel.findById(id);
		if (!employer?.isVerified) {
			return res.status(401).json({
				message: 'Employer should be exist OR should be verified',
			});
		}
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Employer should be verified',
		});
	}
};
