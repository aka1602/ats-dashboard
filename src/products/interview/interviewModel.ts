import  mongoose from 'mongoose';

const interviewSchema= new mongoose.Schema({

jobTitle :{
    type: String,
    required :true
},
addCandidate :{
    type: mongoose.Schema.Types.ObjectId,
	ref: 'candidate',
    required : true,
    

},

AddInterviwer :{
    type : String,
    required : true},


employerId :{
    type: mongoose.Schema.Types.ObjectId,
	ref: 'Employer',
    required : true
},

messageData :{
    type : String ,
    required : true
},

Date :{
    type :Date,
    required : true
},

status :{
    type :String,
   required : true,
   default : 'pending',
   enum : ['pending','reject','interview'],
},

time :{
    type :String,
    required : true
},



})

const interviewModel= mongoose.model('interviews', interviewSchema);

module.exports = interviewModel;
