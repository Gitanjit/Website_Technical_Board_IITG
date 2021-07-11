const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");
const announcementController = require("../controllers/announcement.controller");
const teamController = require("../controllers/team.controller");
const noticeController = require("../controllers/notice.controller");

router.get("/", homeController.getHome);
router.get("/notices/:notice_id", noticeController.getOneNotice);

module.exports = router;
