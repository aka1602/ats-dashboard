import {
	createInterviewer,
	deleteInterviewerById,
	getAllInterviewers,
	getInterviewerById,
	updateInterviewerById,
} from './interviewerController';
import express from 'express';

export default (router: express.Router) => {
	router.get('/interviewer', getAllInterviewers);
	router.post('/interviewer', createInterviewer);
	router.get('/interviewer/:id', getInterviewerById);
	router.patch('/interviewer/:id', updateInterviewerById);
	router.delete('/interviewer/:id', deleteInterviewerById);
};
