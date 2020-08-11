const express = require("express");
const router = express.Router();
const { getFolderById } = require("../controllers/folder");
const {
  getNoteById,
  getNote,
  postNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controllers/note");

//middleware to get folderId param
router.param("folderId", getFolderById);

//middleware to get folderId param
router.param("noteId", getNoteById);

//get note by id
router.get("/:noteId", getNote);

//post a note
router.post("/create/:folderId/", postNote);

//get all note
router.get("/all/:folderId", getAllNotes);

//update a note
router.put("/update/:noteId", updateNote);

//dalete a note
router.delete("/delete/:noteId", deleteNote);

module.exports = router;
