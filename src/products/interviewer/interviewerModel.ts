import mongoose from "mongoose";
import validator from "email-validator";

const interviewerSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: [true, "Contact Number should be mentioned"],
  },
  companyName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
  },
});

export const InterviewerModel = mongoose.model(
  "Interviewer",
  interviewerSchema
);
