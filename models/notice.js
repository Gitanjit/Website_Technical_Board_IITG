const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  important: { type: Boolean, required: true },
  path: { type: String, required: true },
  creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notice", NoticeSchema);
