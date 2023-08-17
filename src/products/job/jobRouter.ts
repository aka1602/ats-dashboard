import express from 'express';
import {
	addCandidate,
	getAllJobs,
	getCandidates,
	getJobById,
	importJob,
	jobClosed,
	jobCreate,
} from './jobController';
import { isLoggedIn } from '../../utils/common';

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - jobTitle
 *         - department
 *         - location
 *         - jobDescription
 *         - employmentType
 *         - senorityLevel
 *         - industryType
 *         - minSalary
 *         - maxSalary
 *         - workExperience
 *         - employerId
 *       properties:
 *         jobTitle:
 *           type: string
 *           description: The title of the job.
 *         department:
 *           type: string
 *           description: The department of the job.
 *         location:
 *           type: string
 *           description: The location of the job.
 *         jobDescription:
 *           type: string
 *           description: The description of the job.
 *         employmentType:
 *           type: string
 *           description: The type of employment (e.g., Full-time, Part-time).
 *         senorityLevel:
 *           type: string
 *           description: The seniority level of the job.
 *         industryType:
 *           type: string
 *           description: The type of industry the job belongs to.
 *         minSalary:
 *           type: number
 *           description: The minimum salary for the job.
 *         maxSalary:
 *           type: number
 *           description: The maximum salary for the job.
 *         workExperience:
 *           type: number
 *           description: The required work experience in years.
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of skills required for the job.
 *         Education:
 *           type: string
 *           description: The required education level for the job.
 *         employerId:
 *           type: string
 *           description: The ID of the employer associated with the job.
 *         Hired:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of IDs of employees hired for the job.
 *         Applied:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of IDs of employees who applied for the job.
 *         Rejected:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of IDs of employees who were rejected for the job.
 *         Source:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of IDs of employees from where the job was sourced.
 *         Interview:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of IDs of employees scheduled for an interview.
 *         Contacted:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of IDs of employees who were contacted for the job.
 *         jobStatus:
 *           type: string
 *           enum: [Open, Closed]
 *           description: The status of the job (Open or Closed).
 */

export default (router: express.Router) => {
	/**
	 * @swagger
	 * tags:
	 *   name: Job
	 *   description: Employee API
	 */
	/**
	 * @swagger
	 * /job:
	 *   post:
	 *     summary: Create a new job
	 *     tags: [Job]
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Job'  # Reference to the Job schema definition
	 *           example:
	 *             jobTitle: Software Engineer
	 *             department: Engineering
	 *             location: San Francisco, CA
	 *             jobDescription: Develop and maintain software applications...
	 *             employmentType: Full-time
	 *             senorityLevel: Mid-Level
	 *             industryType: Technology
	 *             minSalary: 80000
	 *             maxSalary: 120000
	 *             workExperience: 3
	 *             skills:
	 *               - JavaScript
	 *               - React
	 *               - Node.js
	 *             Education: Bachelor's degree in Computer Science
	 *     responses:
	 *       201:
	 *         description: Job created successfully
	 *       400:
	 *         description: Bad request, invalid input
	 *       401:
	 *         description: Unauthorized, authentication required
	 *       500:
	 *         description: Internal server error
	 */
	router.post('/job', isLoggedIn, jobCreate);

	/**
	 * @swagger
	 * /job/hired/{id}:
	 *   get:
	 *     summary: Get candidates hired for a job
	 *     tags: [Job]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: ID of the job to retrieve hired candidates for
	 *     responses:
	 *       200:
	 *         description: Successful response with the list of hired candidates
	 *         content:
	 *           application/json:
	 *             example:
	 *               - candidateId: 5fba66e482c5b61814db82e1
	 *                 name: John Doe
	 *                 position: Software Engineer
	 *               - candidateId: 5fba66e482c5b61814db82e2
	 *                 name: Jane Smith
	 *                 position: Frontend Developer
	 *       400:
	 *         description: Bad request, invalid input
	 *       404:
	 *         description: Job not found
	 *       500:
	 *         description: Internal server error
	 */
	router.get('/job/hired/:id', getCandidates);

	/**
	 * @swagger
	 * /job/import/{id}:
	 *   post:
	 *     summary: Import an old job
	 *     tags: [Job]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: ID of the old job to import
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema: {}
	 *     responses:
	 *       200:
	 *         description: Job imported successfully
	 *       400:
	 *         description: Bad request, invalid input
	 *       401:
	 *         description: Unauthorized, authentication required
	 *       404:
	 *         description: Old job not found
	 *       500:
	 *         description: Internal server error
	 */
	router.post('/job/import/:id', isLoggedIn, importJob);
	/**
	 * @swagger
	 * /job/close/{id}:
	 *   patch:
	 *     summary: Change job status to closed
	 *     tags: [Job]
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: ID of the job to close
	 *     responses:
	 *       200:
	 *         description: Job status changed to closed successfully
	 *       400:
	 *         description: Bad request, invalid input
	 *       401:
	 *         description: Unauthorized, authentication required
	 *       404:
	 *         description: Job not found
	 *       500:
	 *         description: Internal server error
	 */
	router.patch('/job/close/:id', isLoggedIn, jobClosed);

	/**
	 * @swagger
	 * /job/{id}:
	 *   get:
	 *     summary: Get a job by ID
	 *     tags: [Job]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: ID of the job to retrieve
	 *     responses:
	 *       200:
	 *         description: Successful response with the job details
	 *         content:
	 *           application/json:
	 *             example:
	 *               jobTitle: Software Engineer
	 *               department: Engineering
	 *               location: San Francisco, CA
	 *               jobDescription: Develop and maintain software applications...
	 *               employmentType: Full-time
	 *               senorityLevel: Mid-Level
	 *               industryType: Technology
	 *               minSalary: 80000
	 *               maxSalary: 120000
	 *               workExperience: 3
	 *       400:
	 *         description: Bad request, invalid input
	 *       404:
	 *         description: Job not found
	 *       500:
	 *         description: Internal server error
	 */
	router.get('/job/:id', getJobById);

	/**
	 * @swagger
	 * /job/{id}:
	 *   patch:
	 *     summary: Add a candidate to a job
	 *     tags: [Job]
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: ID of the job to add the candidate to
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               candidateId:
	 *                 type: string
	 *               name:
	 *                 type: string
	 *               position:
	 *                 type: string
	 *             example:
	 *               candidateId: 5fba66e482c5b61814db82e1
	 *               name: John Doe
	 *               position: Software Engineer
	 *     responses:
	 *       200:
	 *         description: Candidate added to the job successfully
	 *       400:
	 *         description: Bad request, invalid input
	 *       404:
	 *         description: Job not found
	 *       500:
	 *         description: Internal server error
	 */
	router.patch('/job/:id', addCandidate);
	/**
	 * @swagger
	 * /job:
	 *   get:
	 *     summary: Get all jobs
	 *     tags: [Job]
	 *     responses:
	 *       200:
	 *         description: Successful response with the list of all jobs
	 *       500:
	 *         description: Internal server error
	 */
	router.get('/job', getAllJobs);

	return router;
};
