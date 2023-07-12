import mongoose from "mongoose";
import validator from "email-validator";

const employeeSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true,
  },
  date_of_application: {
    type: String,
    required: true,
  },
  source_of_application: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email should be present"],
    lowercase: true,
    validate: {
      validator: (v: string) => validator.validate(v),
      message: "Invalid email address",
    },
  },
  phone: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  preferredLocation: {
    type: String,
    required: true,
  },
  totalExperience: {
    type: Number,
    required: true,
    min: 0,
  },
  relevantExperience: {
    type: Number,
    min: 0,
  },
  reason_for_change: {
    type: String,
  },
  current_company_name: String,
  current_company_designation: String,
  Department: {
    type: String,
  },
  Role: String,
  Industry: String,
  skills: {
    type: [String],
  },
  ctc: {
    type: Number,
  },
  expected_ctc: {
    type: Number,
    required: true,
  },
  notice_period: {
    type: String,
    required: true,
  },
  last_working_day: {
    type: String,
  },
  undergraduate_Degree: {
    type: String,
    required: true,
  },
  ug_specialization: {
    type: String,
  },
  postgraduation_degree: {
    type: String,
  },
  pg_specialization: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  martial_status: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
  },
  home_city: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);

export const createEmployee = (values: Record<string, any>) =>
  new EmployeeModel(values).save().then((employee) => employee.toObject());

export const getEmployees = () => EmployeeModel.find();

export const getEmployeeByEmail = (email: string) =>
  EmployeeModel.findOne({ email });

export const deleteEmployeeById = (id: string) =>
  EmployeeModel.findByIdAndDelete(id);

export const updateEmployeeById = (id: string, values: Record<string, any>) =>
  EmployeeModel.findByIdAndUpdate(id, values);
