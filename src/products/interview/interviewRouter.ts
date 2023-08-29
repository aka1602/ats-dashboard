import express from 'express';
import {
    bookInterviewController,
	addCandidate,
	getAllJobs,
	getCandidates,
	getJobById,
    addemployerId,
	
} from './interviewController';
export default (router: express.Router) => {
    router.get('intrview/interviewController', bookInterviewController);
    router.get('interview/:id', getCandidates);
    router.get('/job/:id', getJobById);
    router.get('/applied/:id', addCandidate);
	router.get('/job', getAllJobs);
    router.get('/employer/:id',addemployerId);

	return router;
};