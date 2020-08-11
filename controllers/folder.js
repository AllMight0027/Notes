const Folder = require("../models/Folder");
const ObjectId = require("mongodb").ObjectID;

//folder param (middleware)
exports.getFolderById = (req, res, next, id) => {
  Folder.findById(id)
    .then((folder) => {
      if (!folder)
        return res
          .status(400)
          .json({ status: "Failed", error: "Folder id doesn't exists" });
      req.folder = folder;
      next();
    })
    .catch((err) => console.log(err));
};

//get folder by id
exports.getFolder = (req, res) => {
  res.status(200).json(req.folder);
};

//add new folder
exports.postFolder = (req, res) => {
  const folder = new Folder(req.body);
  folder.user = ObjectId(req.profile._id);
  folder
    .save()
    .then((folder) => {
      if (!folder) {
        return res.json({ error: "Failed to add folder" });
      }
      res.status(200).json(folder);
    })
    .catch((err) => console.log(err));
};

//get all folders
exports.getAllFolders = (req, res) => {
  Folder.find({ user: req.profile._id })
    .then((folders) => {
      if (folders.length == 0)
        return res
          .status(200)
          .json({ status: "Success", error: "No Folder exists" });
      folders.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0
      );

      res.json(folders);
    })
    .catch((err) => console.log(err));
};

//update a folder
exports.updateFolder = (req, res) => {
  Folder.findByIdAndUpdate(
    { _id: req.folder._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((folder) => {
      res.status(200).json(folder);
    })
    .catch((err) => console.log(err));
};

//delete a folder
exports.deleteFolder = (req, res) => {
  Folder.findByIdAndDelete({ _id: req.folder._id })
    .then((folder) => {
      return res
        .status(200)
        .json({ status: "Success", message: "Folder Deleted" });
    })
    .catch((err) => console.log(err));
};
