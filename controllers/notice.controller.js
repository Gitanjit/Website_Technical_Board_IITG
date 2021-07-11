const Notice = require("../models/notice");
const fs = require("fs");

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({}).sort("-creation");
    return res.render("notices/index", { notices });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getOneNotice = async (req, res) => {
  try {
    const id = req.params.notice_id;
    
    const notice = await Notice.findById(id);
    const filePath = "uploads/notice/" + notice.path;
    
    fs.readFile(filePath, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(req.params.notice_id, "1")
    console.log(error.message);
  }
};

exports.addNoticeForm = (req, res) => {
  try {
    return res.render("notices/add");
  } catch (error) {
    console.log(error.message);
  }
};

exports.postNotice = async (req, res) => {
  // console.log(req.file);
  try {
    const { title, description, link,imp } = req.body;
    const important = imp ? true : false;
    const path = req.file ? req.file.filename : link;
    var newNotice = new Notice({
      title,
      description,
      path,
      important,
    });
    await newNotice.save();
    // console.log(newNotice)
    req.flash("success", "Successfully added new notice!");
    return res.redirect("/tech/admin/notice");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    return res.render("notices/edit", { notice });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editNotice = async (req, res) => {
  try {
    const {id} = req.params;
    const notice = await Notice.findById(id);

    const { title, description, link,imp} = req.body;
    const important = imp ? true : false;
    let data;

    if(req.file){
      fs.unlinkSync(`uploads/notice/${notice.path}`);
    }

    const path = req.file ? req.file.filename : link;
    if (!req.file && !link) {
      data = { title, description,important};
    } else {
      data = { title, description,important, path};
    }
    await Notice.findByIdAndUpdate(req.params.id, data);

    req.flash("success", "Successfully updated notice!");
    return res.redirect("/tech/admin/notice");
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const id = req.params.id;
    const notice = await Notice.findById(id);
    await Notice.findByIdAndDelete(id);
    fs.unlinkSync(`uploads/notice/${notice.path}`);

    req.flash("success", "Successfully deleted notice!");
    return res.redirect("/tech/admin/notice");
  } catch (err) {
    // handle the error
    console.log(err.message);
    return res.redirect("/tech/admin/notice");
  }
};
