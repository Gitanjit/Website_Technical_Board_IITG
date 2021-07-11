const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name : {type : String, required : true},
    image: {type : String, required : true},
    email: {type : String, required : true},
    linkedin: {type : String, required : true},
    contactNo : {type: String, required : true},
    post : {type : String, required : true},
    year : {type : String, required : true, maxLength: 7},
    priority_number : {type : String, required : true}
});

module.exports = mongoose.model("Team", TeamSchema);