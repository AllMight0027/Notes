const Note = require("../models/Note");
const ObjectId = require("mongodb").ObjectID;

//note param (middleware)
exports.getNoteById = (req, res, next, id) => {
  Note.findById(id)
    .then((note) => {
      if (!note)
        return res
          .status(400)
          .json({ status: "Failed", error: "Note id doesn't exists" });
      req.note = note;
      next();
    })
    .catch((err) => console.log(err));
};

//get note by id
exports.getNote = (req, res) => {
  res.status(200).json(req.note);
};

//add new note
exports.postNote = (req, res) => {
  const note = new Note(req.body);
  note.folder = ObjectId(req.folder._id);
  note
    .save()
    .then((note) => {
      if (!note) {
        return res.json({ error: "Failed to add note" });
      }
      res.status(200).json(note);
    })
    .catch((err) => console.log(err));
};

//get all notes
exports.getAllNotes = (req, res) => {
  Note.find({ folder: req.folder._id })
    .then((notes) => {
      if (notes.length == 0)
        return res
          .status(200)
          .json({ status: "Success", error: "No Note exists" });
      notes.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0
      );

      res.json(notes);
    })
    .catch((err) => console.log(err));
};

//update a note
exports.updateNote = (req, res) => {
  Note.findByIdAndUpdate(
    { _id: req.note._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => console.log(err));
};

//delete a note
exports.deleteNote = (req, res) => {
  Note.findByIdAndDelete({ _id: req.note._id })
    .then((note) => {
      return res
        .status(200)
        .json({ status: "Success", message: "Note Deleted" });
    })
    .catch((err) => console.log(err));
};
