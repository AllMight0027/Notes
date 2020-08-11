const NoteUser = require("../models/NoteUser");

//extract user by id and populate req.profile (middleware)
exports.getUserById = (req, res, next, id) => {
  NoteUser.findById(id)
    .then((user) => {
      if (!user)
        return res
          .status(400)
          .json({ status: "Failed", error: "NoteUser id doesn't exists" });
      req.profile = user;
      next();
    })
    .catch((err) => console.log(err));
};

//throw req.profile to front end
exports.getUser = (req, res) => {
  //hiding critical info
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.__v = undefined;
  res.status(200).json(req.profile);
};
