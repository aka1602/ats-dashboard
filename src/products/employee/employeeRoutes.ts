import upload from '../../utils/imageConfig';
import {
	addResume,
	create,
	deleteEmployee,
	getAllEmployees,
	updateEmployee,
} from './employeeController';
import express from 'express';

export default (router: express.Router) => {
	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     Employee:
	 *       type: object
	 *       required:
	 *         - name
	 *         - job_title
	 *         - date_of_application
	 *         - source_of_application
	 *         - email
	 *         - phone
	 *         - currentLocation
	 *         - preferredLocation
	 *         - totalExperience
	 *         - expected_ctc
	 *         - notice_period
	 *         - undergraduate_Degree
	 *         - ug_specialization
	 *         - gender
	 *         - currentLocation
	 *         - dob
	 *
	 *       properties:
	 *          job_title:
	 *            type: String
	 *            description: Job Applied for
	 *            example: "Backend Engineer"
	 *          date_of_application:
	 *            type: String
	 *            description: Date when Applied
	 *            example: "2021-08-01"
	 *          source_of_application:
	 *            type: String
	 *            description: Sources where saw the job application
	 *            example: "Indeed"
	 *          name:
	 *            type: String
	 *            description: Employee name
	 *            example: "John Doe"
	 *          email:
	 *            type: String
	 *            description: Email
	 *            example: "john@gmail.com"
	 *          phone:
	 *            type: String
	 *            description: Contact Number
	 *            example: "9010101010"
	 *          currentLocation:
	 *            type: String
	 *            description: employee Current Location
	 *            example: "Mumbai"
	 *          preferredLocation:
	 *            type: String
	 *            description: Location Prefferred for
	 *            example: "Mumbai"
	 *          totalExperience:
	 *            type: Number
	 *            example: 10
	 *          relevantExperience:
	 *            type: Number
	 *            description: Relevant Experenice same as job you apply for
	 *            example: 10
	 *          reason_for_change:
	 *            type: String
	 *            description: Reason for changing Job
	 *            example: "I want to change the Job"
	 *          current_company_name:
	 *            type: String
	 *            description: Current Company name
	 *            example: "HrCadre"
	 *          current_company_designation:
	 *            type: String
	 *            description: Current company designation
	 *            example: "software engineer"
	 *          Department:
	 *            type: String
	 *            description:  Department Currently working on
	 *            example:  "IT"
	 *          Role:
	 *            type: String
	 *            description: Position at company employee apply for
	 *            example: "Software engineer"
	 *          Industry:
	 *            type: String
	 *            description: Current Industry
	 *            example: "Tech"
	 *          skills:
	 *            type: array
	 *            items:
	 *              type: string
	 *            example: ["JS", "HTML", "CSS"]
	 *          ctc:
	 *            type: Number
	 *            description: current ctc
	 *            example: 1000000
	 *          expected_ctc:
	 *            type: Number
	 *            description: Expected Ctc from new company
	 *            example: 1200000
	 *          notice_period:
	 *            type: String
	 *            description: Notice period of current Company
	 *            example : "6 months"
	 *          last_working_day:
	 *            type: String
	 *            description: last Working Date
	 *            example: "2023-12-01"
	 *          undergraduate_Degree:
	 *            type: String
	 *            description: UG Degree
	 *            example: "B.Tech"
	 *          ug_specialization:
	 *            type: String
	 *            description: UG specialization
	 *            example: "None"
	 *          postgraduation_degree:
	 *            type: String
	 *            description: PG Degree
	 *            example: "None"
	 *          pg_specialization:
	 *            type: String
	 *            description: PG specialization
	 *            example: "None"
	 *          gender:
	 *            type: String
	 *            description: Gender
	 *            enum:
	 *              - "male"
	 *              - "female"
	 *              - "other"
	 *            example: "male"
	 *          martial_status:
	 *            type: String
	 *            enum:
	 *              - "single"
	 *              - "married"
	 *              - "divorced"
	 *              - "widowed"
	 *            example: "single"
	 *          home_city:
	 *            type: String
	 *            description: Home city/ town
	 *            example: "Jaipur"
	 *          dob:
	 *            type: Date
	 *            description: Date of Birth
	 *            example: "2000-01-10"
	 *
	 *
	 *
	 */

	/**
	 * @swagger
	 * tags:
	 *   name: Employee
	 *   description: Employee API
	 */
	/**
	 * @swagger
	 * /employee:
	 *   get:
	 *     summary: Returns the list of all employees
	 *     tags: [Employee]
	 *     responses:
	 *       200:
	 *         description: The list of the employees
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 */
	router.get('/employee', getAllEmployees);
	/**
	 * @swagger
	 * /employee:
	 *    post:
	 *      summary: Add a new employee
	 *      tags: [Employee]
	 *      description: Add a new employee for interview
	 *      requestBody:
	 *        description: Add a new employee
	 *        required: true
	 *        content:
	 *          application/json:
	 *            schema:
	 *              $ref: '#components/schemas/Employee'
	 *      responses:
	 *        '201':
	 *          description: Employee Added Successfully
	 *
	 */

	router.post('/employee', upload.single('resume'), create);
	router.post('/employee/:id/resume', upload.single('resume'), addResume);
	/**
	 * @swagger
	 * /employee/{employeeId}:
	 *    patch:
	 *      summary: Update employee details
	 *      description: Update employee details
	 *      tags: [Employee]
	 *      parameters:
	 *        - name: employeeId
	 *          in: path
	 *          description: Id of employee
	 *          required: true
	 *          schema:
	 *            type: string
	 *      requestBody:
	 *        description: Values to update in employee
	 *        content:
	 *          application/json:
	 *            schema:
	 *              type: object
	 *      responses:
	 *        "200":
	 *           description: "Employee is updated"
	 *
	 *
	 */
	router.patch('/employee/:id', updateEmployee);
	/**
	 * @swagger
	 * /employee/{employeeId}:
	 *    delete:
	 *      summary: Delete employee details
	 *      description: Delete employee details
	 *      tags: [Employee]
	 *      parameters:
	 *        - name: employeeId
	 *          in: path
	 *          description: Id of employee
	 *          required: true
	 *          schema:
	 *            type: string
	 *      responses:
	 *        "200":
	 *           description: "Employee is deleted"
	 *
	 *
	 */

	router.delete('/employee/:id', deleteEmployee);
};
