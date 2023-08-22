const mongoose =require('mongoose');

const interviewSchema= new mongoose.Schema({

jobTitle :{
    type: String,
    required :true
},

AddInterviwer :{
    type : String,
    required : true},


employerId :{
    type : String ,
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
default : 'pending'
},

time :{
    type :String,
    required : true
},



})

const interviewModel= mongoose.model('interviews', interviewSchema);

module.exports = interviewModel;
