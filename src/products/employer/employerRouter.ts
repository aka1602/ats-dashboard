import { isLoggedIn } from '../../utils/common';
import {
	signup,
	getAllEmployers,
	getEmployerById,
	updateEmployerById,
	login,
} from './employerController';
import express from 'express';


	

	

	
	//   router.delete("/:id", delel);


/**
 * @swagger
 * components :
 * schemas:
 *   employer :
 *    required : 
 *     -name 
 *     -email
 *     -role 
 *     -phone 
 *     -password 
 *     -CompanyName 
 *     -designation 
 *     -industryType 
 *     -pincode 
 *     -address 
 *     -interviewers 
 *     -Responses 
 *     -employerId
 *   properties :
 *            name : id
 *              required : True
 *            email :
 *              type : string 
 *               required : True 
 *            role : 
 *               Description : role of Employer
 *            phone : 
 *                    type : integer
 *                required : True
 *                Description : phone number  of Employer
 *            password :
 *               type :string (min. 8 cahrachters)
 *                required : True
 *            companyName :
 *               Description : Name of company of Employeer
 *               required : True 
 *               type : string 
 *            industry :
 *                 Description : Name of   industry  in which   Employeer is employeed
 *               required : True 
 *               type : string 
 *            designation : 
 *                Description : Designation of Employeer
 *               required : True 
 *               type : string 
 *            pincode :
 *                Description : Pincode of Area 
 *               type : integer  
 *            address :
 *                Description : address of  Employeer(company address)
 *               required : True 
 *               type : string 
 *            interviewers :
 *               Description : employee is interviewer for any job role 
 *               required : True 
 *               type : string 
 * 
 *            EmployerID : 
 *              Description : Id granted to particular employee 
 *               required : True
 * 
 * */
export default (router: express.Router) => {

	/*
 *     
 *   Signup :
 *     required :
 *        -Email
 *        -Password
 *     properties :
 *      Email:
 *       type :string
 *        [required field ]
 *      Password :
 *        type : string (min. 8 charachters)
 *         [required field] */

router.post('/employer/signup', signup);
/* 
 *     Login :
 *      required :
 *        -Email
 *        -Password
 *     properties :
 *      Email:
 *       type :string
 *        [required field ]
 *      Password :
 *        type : string (min. 8 charachters)
 *         [required field] */

  router.post('/employer/login', login);
  /*  
         
 *      get:
 *      Employer Record :
 *        required:
 *          Employer Data
 *         summary : Import employer data from EmployerModel
 *          parameters :
 *            -name : id
 *              required : True
 *            -email :
 *              type : string 
 *               required : True 
 *            -role : 
 *               Description : role of Employer
 *            -phone : 
 *                    type : integer
 *                required : True
 *                Description : phone number  of Employer
 *            -password :
 *               type :string (min. 8 cahrachters)
 *                required : True
 *            -companyName :
 *               Description : Name of company of Employeer
 *               required : True 
 *               type : string 
 *            -industry :
 *                 Description : Name of   industry  in which   Employeer is employeed
 *               required : True 
 *               type : string 
 *            -designation : 
 *                Description : Designation of Employeer
 *               required : True 
 *               type : string 
 *            -pincode :
 *                Description : Pincode of Area 
 *               type : integer  
 *            -address :
 *                Description : address of  Employeer(company address)
 *               required : True 
 *               type : string 
 *            -interviewers :
 *               Description : employee is interviewer for any job role 
 *               required : True 
 *               type : string 
 *            responses:
 *       200:
 *         description: List of all Employers
 *       400:
 *         description: Bad request, invalid input (error occured)
 *      
 * 
 */
router.get('/employer', getAllEmployers);
/** get:
   patch:
 *     summary: Add employeerId from getAllemployers
 *     tags: [ID]
 *     required : [Login]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: add ID of the employeer
 *     requestBody:
 *         parameters :
 *            -Interviewers : id
 *              required : True
 *            -name :
 *              type : string 
 *               required : True 
 *            -email : 
 *               Description : EmailId  of Employer
 *      responses:
 *       200:
 *         description: Employer Id  added  successfully
 *       400:
 *         description: Bad request, invalid input (error occured)
 *      
 
 * 
 */
router.get('/employer/:id', isLoggedIn, getEmployerById);

/**
 *       patch:
 *        summary: update  Employee Id 
 *         tags : [ID]
 *      parameters:
 *       - in: path
 *          id :
 *           required: true
 *         values :
 *           reqired : True
 *         schema:
 *           type: string
 *         description: update EmployeeId
 *     responses:
 *       200:
 *         description: JEmployer Successfully updated
 *       400:
 *         description: Bad request, invalid input (error occured)
 
 * 
 * 
 */
	router.patch('/employer/:id', updateEmployerById);



};
