const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAdmin } = require("../middleware");
const teamController = require("../controllers/team.controller");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../uploads/team`);
    },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/",isLoggedIn, isAdmin, teamController.getTeamMembers);
router.get(
    "/add",
    isLoggedIn,
    isAdmin,
    teamController.addTeamForm
  );
router.post("/",isLoggedIn, isAdmin, upload.single("image") , teamController.postMember);

router.post(
    "/find",
    isLoggedIn,
    isAdmin,
    upload.single("image"),
    teamController.findTeam
  );

router.get("/:id", isLoggedIn, isAdmin, teamController.getEditForm);
router.put("/:id",isLoggedIn, isAdmin, upload.single("image") , teamController.editMember);

router.delete("/:id",isLoggedIn, isAdmin, teamController.deleteMember);

module.exports = router;