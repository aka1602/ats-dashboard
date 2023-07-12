import mongoose from "mongoose";
import validator from "email-validator";

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name should be present"],
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
  role: {
    type: String,
    required: [true, "Role should be mentioned"],
    enum: ["Company", "Individual"],
  },
  password: {
    type: String,
    // required: [true, "Password should be present"],
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    // required: [true, "confirm the password"],
    minLength: 8,
  },
  phone: {
    type: String,
    required: [true, "Contact Number should be mentioned"],
  },
  companyName: {
    type: String,
    required: [true, "Company Name should be present"],
  },
  industry: {
    type: String,
    required: [true, "Company's industry should be mentioned"],
  },
  designation: {
    type: String,
    required: [true, "Designation should be mentioned"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode should be mentioned"],
  },
  address: {
    type: String,
    required: [true, "Address should be present"],
  },
  interviewers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Interviewer",
  },
});

export const EmployerModel = mongoose.model("Employer", employerSchema);
