import express from 'express';
import { InterviewModel } from './interviewModel';
import { EmployeeModel } from '../employee';
import { jobModel } from '../job/jobModel';

export const bookInterviewController = async (
  req: express.Request,
	res: express.Response
) => {
  try {
    req.body.status = "pending";
    const newAppointment = new InterviewModel(req.body);
    await newAppointment.save();
    const user = await InterviewModel.findOne({ _id: req.body.employerId });
    
    user.notifcation.push({
      type: "New-interview-request",
      message: `A new interview Request from ${req.body.userInfo.name}`,
      
    });// this will call schedule interview api and message of interview is scheduled is visible if no error occured 
    await user.save();
    res.status(200)
    return res.json({
      success: true,
      message: "interview scheduled succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While interview scheduling",
    });
  }
};

	export const addCandidate = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const data = req.body;

		const candidate = await EmployeeModel.create(data);
		await jobModel.findOneAndUpdate(
			{ _id: id },
			{
				$push: { Source: candidate._id },
			}
		);
		return res.json({
			message: 'Candidate added successfully',
		});
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const addemployerId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const employerId = req.params.id;

		const jobId = await jobModel.findById(employerId);
		return res.json(jobId).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const getJobById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;

		const job = await jobModel.findById(id);
		return res.json(job).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const getAllJobs = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const jobs = await jobModel.find();

		return res.status(200).json(jobs).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(403);
	}
};

export const getCandidates = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const id = req.params.id;
		const fields = ' Interview ';
		const data = await jobModel.findById(id, fields);

		return res.json(data);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};