const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer();

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// multer middleware expects a single file with the field name 'upfile'
// file metadata will be output in res.json in the format of {"name":"readme.txt","type":"text/plain","size":1811}
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
