const mongoose = require('mongoose');

const TeamYearSchema = new mongoose.Schema({
    year : {type : String, required : true, maxLength: 7},
});

module.exports = mongoose.model("Year", TeamYearSchema);