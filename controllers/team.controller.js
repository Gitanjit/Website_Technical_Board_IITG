const Team = require("../models/team");
const Year = require("../models/teamyear");
const fs = require("fs");

exports.getTeamMembers = async (req, res) => {
    try{
        const members = await Team.find({}).sort("-year").sort("priority_number");

        const tyear = await Year.find({});
        return res.render("teams/index", { members, tyear });
    }
    catch(err){
        console.log(err);
        return res
            .status(424)
            .json({status:"Failed", message:"Request failed"});
    }
};

exports.addTeamForm = (req, res) => {
    try {
      return res.render("teams/add");
    } catch (error) {
      console.log(error.message);
    }
  };

exports.postMember = async (req, res) => {
    try{
        if(!req.file){
            return res
                .status(424)
                .json({status:"Failed", message:"No File Provided"});
        }
        // const { year } = req.params;
        const {name, email, contactNo, post, priority_number, linkedin} = req.body;
        let {year} = req.body;
        const image = req.file.filename;
        const newTeamData = new Team({name, image, email, contactNo, post, year, priority_number, linkedin});
        await newTeamData.save();
        const tyear = await Year.find({ year: year });
        if (tyear.length == 0) {
            const newYear = new Year({ year: year });
            await newYear.save();
        }
        req.flash("success", "Successfully added new Member!");
        return res.redirect("/tech/admin/team");
    }
    catch(err){
        console.log(err);
        return res
            .status(424)
            .json({status:"Failed", message:"Request failed"});
    }
};

exports.findTeam = async (req, res) => {
    try {
      const val = req.body.dropdown;
      
      var members = await Team.find({
        $and: [
          { year: { $regex: val, $options: "i" } },
        ],
      }).sort("priority_number");
      var tyear = await Year.find({});
      res.render("teams/index", { members, tyear });
    } catch (error) {
      console.log(error.message);
    }
};

exports.getEditForm = async (req, res) => {
    try {
      const member = await Team.findById(req.params.id);
      return res.render("teams/edit", { member });
    } catch (error) {
      console.log(error.message);
    }
};

exports.editMember = async (req, res) => {
    try{
        const {id} = req.params;
        const TeamData = await Team.findById(id);
        const {name, email, contactNo, post, priority_number, linkedin} = req.body;
        let {year} = req.body;
        let image;
        let data = {name, email, contactNo, post, year, priority_number, linkedin};
        if(req.file){
            fs.unlinkSync(`uploads/team/${TeamData.image}`);
            image = req.file.filename;
            data =  {name, image, email, contactNo, post, year , priority_number, linkedin};
        }
        // console.log(data);

        await Team.findByIdAndUpdate(id, data);
        
        const tyear = await Year.find({ year: year });
        if (tyear.length == 0) {
            const newYear = new Year({ year: year });
            await newYear.save();
        }
        req.flash("success", "Successfully Updated Member Data!");
        return res.redirect("/tech/admin/team");
    }
    catch(err){
        console.log(err);
        return res
            .status(424)
            .json({status:"Failed", message:"Request failed"});
    }
};

exports.deleteMember = async (req, res) => {
    try{
        const {id} = req.params;
        const MemberData = await Team.findById(id);
        await Team.findByIdAndDelete(id);
        fs.unlinkSync(`uploads/team/${MemberData.image}`);
        req.flash("success", "Successfully Deleted Member!");
        return res.redirect("/tech/admin/team");
    }
    catch(err){
        console.log(err);
        return res
            .status(424)
            .json({status:"Failed", message:"Request failed"});
    }
};