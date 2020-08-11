require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const user = require("./routes/user");
const folder = require("./routes/folder");
const note = require("./routes/note");

//bodyparser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//cookieparser middleware
app.use(cookieParser());

//cors middleware
app.use(cors());

//Mongodb connect
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//set routes to api
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/folder", folder);
app.use("/api/note", note);

port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Port ${port} is running`);
});
