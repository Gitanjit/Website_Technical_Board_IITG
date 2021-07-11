const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/notice");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const noticeController = require("../controllers/notice.controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, noticeController.getNotices);

router.get("/add", isLoggedIn, isAdmin, noticeController.addNoticeForm);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("notice"),
  noticeController.postNotice
);

router.get("/:id", noticeController.getEditForm);

router.get("/pdf/:notice_id", noticeController.getOneNotice);

router.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  upload.single("notice"),
  noticeController.editNotice
);

router.delete(
  "/:id",
  isLoggedIn,
  isAdmin,
  noticeController.deleteNotice
);

module.exports = router;
