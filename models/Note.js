const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    folder: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Folder",
    },
    noteText: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Note = mongoose.model("Note", noteSchema);
