const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "NoteUser",
    },
  },
  { timestamps: true }
);

module.exports = Folder = mongoose.model("Folder", folderSchema);
