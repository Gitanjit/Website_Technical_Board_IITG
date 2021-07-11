const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  club: {type:String, required:true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  important: { type: Boolean, required: true },
  pic: { type: String, required: true },
  link: { type: String, required: true },
  creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
