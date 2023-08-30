import express from 'express';
import { google } from 'googleapis';
import { Dayjs } from 'dayjs';
import { v4 } from 'uuid';

const calendar = google.calendar({
	version: 'v3',
	auth: 'AIzaSyAMg7aE1GYuLY9HJM7BTS4k3n95KbysIzU',
});

const oauth2Client = new google.auth.OAuth2(
	'54807242707-euie6m9v5njl0vkrjr1pnb5ipdkl7qhr.apps.googleusercontent.com',
	'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',
	'http://localhost:3000/google/redirect'
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

/*
MSG:- 
HANDLE WITH FRONTEND BECAUSE IT OPENS A WINDOW TO LOGIN NOT ACCESSBILE THROUGH REST 
ARCHITECTURE................
*/

const oauth2Login = async (req: express.Request, res: express.Response) => {
	try {
		const url = oauth2Client.generateAuthUrl({
			access_type: 'online',
			scope: scopes,
		});
		res.redirect(url);
	} catch (error) {
		return res.status(404).json({
			message: error,
		});
	}
};
/*
This is the function for redirect URL 
*************************
IT IS TEMPORAY SOLUTION 
RECOMMENDED TO HANDLE WITH FRONTEND
*************************
*/

const redirectFunction = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const code = req.query.code;
		if (!code) return res.status(404).json({ message: 'CODE DOES NOT EXIST' });
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);

		return res.status(201).json({ message: 'It is working properly' });
	} catch (error) {
		return res.status(404).json({
			message: error,
		});
	}
};
/*
Used to schedule an  meet recommeded to handle through frontend Because of FrontEND 

*/
const scheduleMeet = async (req: express.Request, res: express.Response) => {
	try {
		const event = {
			summary: 'Google I/O 2015',
			location: '800 Howard St., San Francisco, CA 94103',
			description: "A chance to hear more about Google's developer products.",
			start: {
				dateTime: '2023-08-30T09:00:00-07:00',
				timeZone: 'America/Los_Angeles',
			},
			end: {
				dateTime: '2023-08-30T17:00:00-07:00',
				timeZone: 'America/Los_Angeles',
			},
			recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
			attendees: [
				{
					email: 'abhi1801jeet@gmail.com',
					email: '202151002@iiitvadodara.ac.in',
				},
			],
			reminders: {
				useDefault: false,
				overrides: [
					{ method: 'email', minutes: 24 * 60 },
					{ method: 'popup', minutes: 10 },
				],
			},
			conferenceData: {
				createRequest: { requestId: v4() },
			},
		};
		await calendar.events.insert({
			calendarId: 'primary',
			auth: oauth2Client,
			resource: event,
		});
		return res.status(201).json({
			message: 'MEET SCHEDULED',
		});
	} catch (error) {
		return res.status(404).json({
			message: error,
		});
	}
};
export default (router: express.Router) => {
	router.get('/oauthLogin', oauth2Login);
	router.get('/google/redirect', redirectFunction);
	router.get('/meet/create', scheduleMeet);
	return router;
};
