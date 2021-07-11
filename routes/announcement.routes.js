const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAdmin } = require("../middleware");
const announcementController = require("../controllers/announcement.controller");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../uploads/announcement`);
    },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, announcementController.getAnnouncements);

router.get(
  "/add",
  isLoggedIn,
  isAdmin,
  announcementController.addAnnouncementForm
);

router.post("/", isLoggedIn, isAdmin, upload.single("pic"), announcementController.postAnnouncement);

router.get("/:id", isLoggedIn, isAdmin, announcementController.getEditForm);

router.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  announcementController.editAnnouncement
);

router.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  announcementController.deleteAnnouncement
);

module.exports = router;
