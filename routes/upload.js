// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Папки для сохранения
const modelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '3Dmodels/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const previewStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'previews/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: multer.memoryStorage() }); // использовать память временно

const fullUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = file.fieldname === 'model' ? 'models/' : 'previews/';
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

router.post('/upload', fullUpload.fields([
  { name: 'model', maxCount: 1 },
  { name: 'preview', maxCount: 1 }
]), (req, res) => {
  const { name, description, category } = req.body;
  const modelFile = req.files.model[0];
  const previewFile = req.files.preview[0];

  // Размер файла в мегабайтах
  const sizeMB = (modelFile.size / (1024 * 1024)).toFixed(2);

  const newModel = {
    name,
    description,
    category,
    modelPath: `3Dmodels/${modelFile.filename}`,
    previewPath: `previews/${previewFile.filename}`,
    sizeMB
  };

  // Тут можно сохранить newModel в базу данных

  res.json({ message: 'Файл успешно загружен', model: newModel });
});

module.exports = router;
