const express = require("express");
const router = express.Router();
const {
  postFolder,
  getAllFolders,
  getFolderById,
  getFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/folder");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//middleware to get userId param and populate req.profile
router.param("userId", getUserById);

//middleware to get folderId param
router.param("folderId", getFolderById);

//get folder by id
router.post("/get/:userId/:folderId", isSignedIn, isAuthenticated, getFolder);

//post a folder
router.post("/create/:userId", isSignedIn, isAuthenticated, postFolder);

//get all folders
router.post("/all/:userId", isSignedIn, isAuthenticated, getAllFolders);

//update a folder
router.put(
  "/update/:userId/:folderId",
  isSignedIn,
  isAuthenticated,
  updateFolder
);

//dalete a folder
router.delete(
  "/delete/:userId/:folderId",
  isSignedIn,
  isAuthenticated,
  deleteFolder
);

module.exports = router;
