import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
	jobTitle: {
		type: String,
		required: [true, 'Job title should be mentioned'],
	},
	department: {
		type: String,
		required: [true, 'department should be present'],
	},
	location: {
		type: String,
		required: [true, 'location should be mentioned'],
	},
	jobDescription: {
		type: String,
		required: [true, 'Job description should be present'],
	},
	employmentType: {
		type: String,
		required: [true, 'employment type should be present'],
	},
	senorityLevel: {
		type: String,
		required: [true, 'Senority Level  should be mentioned'],
	},
	industryType: {
		type: String,
		required: [true, 'industry type should be mentioned'],
	},
	minSalary: {
		type: Number,
		required: [true, 'minimum salary must be mentioned'],
	},
	maxSalary: {
		type: Number,
		required: [true, 'maximum salary should be mentioned'],
	},
	workExperience: {
		type: Number,
		required: [true, 'work experience(in Years) must be required'],
	},
	skills: [
		{
			type: String,
		},
	],
	Education: {
		type: String,
	},
	employerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'employer Id should be created'],
	},
});

export const jobModel = mongoose.model('job', jobSchema);
