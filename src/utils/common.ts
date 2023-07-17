import express from 'express';
import crypto from 'crypto';
import { get, merge } from 'lodash';
import { getEmployerBySessionToken } from '../products/employer';
export const random = () => crypto.randomBytes(120).toString('base64');

const SECRET = `${process.env.SECRET_KEY}`;
export const authentication = (salt: string, password: string) => {
	return crypto
		.createHmac('sha256', [salt, password].join('/'))
		.update(SECRET)
		.digest('hex');
};

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const sessionToken = req.cookies('AUTH-COOKIE');

		if (!sessionToken) {
			return res.sendStatus(403);
		}
		const existingUser = await getEmployerBySessionToken(sessionToken);
		if (!existingUser) {
			return res.sendStatus(403);
		}

		merge(req, { employer: existingUser });
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const isOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const id = req.params.id;

		let currentUserId: any = get(req, 'employer._id');
		if (!currentUserId) {
			return res.sendStatus(403);
		}
		currentUserId = String(currentUserId);
		if (currentUserId !== id) {
			return res.sendStatus(403);
		}
		next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};
