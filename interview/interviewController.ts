const bookInterviewController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new interviewModel(req.body);
    await newAppointment.save();
    const user = await interviewModel.findOne({ _id: req.body.employerId });
    user.notifcation.push({
      type: "New-interview-request",
      message: `A nEw interview Request from ${req.body.userInfo.name}`,
      
    });
    await user.save();
    res.status(200).send({
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