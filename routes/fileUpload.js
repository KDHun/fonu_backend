const multer = require("multer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  getFileById,
  addFile,
  deleteFile,
} = require("../controller/filesUpload");

const router = express.Router();


const uploadImageFolder = path.join(__dirname, "..", "uploads", "image");
const uploadAudioFolder = path.join(__dirname, "..", "uploads", "audio");


fs.mkdirSync(uploadImageFolder, { recursive: true });
fs.mkdirSync(uploadAudioFolder, { recursive: true });


const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadImageFolder),
  filename: (req, file, cb) =>
    cb(
      null,
      `${path.parse(file.originalname).name}_${Date.now()}${path.extname(
        file.originalname
      )}`
    ),
});

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadAudioFolder),
  filename: (req, file, cb) =>
    cb(
      null,
      `${path.parse(file.originalname).name}_${Date.now()}${path.extname(
        file.originalname
      )}`
    ),
});


const uploadImage = multer({ storage: imageStorage });

const uploadAudio = multer({ storage: audioStorage });

router.post("/upload/image", uploadImage.single("file"), async (req, res) => {
  try {
    res.json(await addFile(req.file));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/upload/audio", uploadAudio.single("file"), async (req, res) => {
  try {
    res.json(await addFile(req.file));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    if (!file) return res.status(404).send("File not found");

    const filePath = path.join(
      file.type === "image" ? uploadImageFolder : uploadAudioFolder,
      file.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      await deleteFile(req.params.id);
      res.send("File successfully deleted");
    } else {
      res.status(404).send("File not found on server");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
