const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const noteUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    salt: String,
    encryptPassword: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

noteUserSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryptPassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

noteUserSchema.methods = {
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encryptPassword;
  },
};

module.exports = NoteUser = mongoose.model("NoteUser", noteUserSchema);
