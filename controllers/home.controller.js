const Notice = require("../models/notice");
const Announcement = require("../models/announcement");
const Team = require("../models/team");
const TeamYear = require("../models/teamyear");

exports.getHome = async (req, res) => {
  let notices = await Notice.find({}).sort("-creation");
  let tyear = await TeamYear.find({}).sort("-year");
  let announcements = await Announcement.find({}).sort("-creation");
  let teams = await Team.find({}).sort("-year").sort("priority_number");
  return res.render("home/index", {
    notices,
    announcements,
    teams,
    tyear,
  });
};

