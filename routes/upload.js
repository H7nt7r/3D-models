const express = require("express");
const multer = require("multer");
const path = require("path");
const Model = require("../models/Models");
const Model_user = require("../models/Models_users");
const Model_Category = require("../models/Model_Category");
const { sequelize } = require("../models/connectToBD");
const authenticate = require("../error/authenicate");

const router = express.Router();

// Настройка хранилища для модели и превью
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "model") {
      cb(null, path.join(__dirname, "../assets/models"));
    } else if (file.fieldname === "preview") {
      cb(null, path.join(__dirname, "../assets/images"));
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.fields([
    { name: "model", maxCount: 1 },
    { name: "preview", maxCount: 1 },
  ]),
  async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { name, description, sizes, user_id, access_to_download, categories } = req.body;
      const modelFile = req.files["model"]?.[0];
      const previewFile = req.files["preview"]?.[0];

      if (!modelFile) {
        return res.status(400).json({ message: "Model file is required." });
      }

      const memory = (modelFile.size / (1024 * 1024)).toFixed(2) + " MB";
      const date = new Date();

      const newModel = await Model.create({
        name,
        description,
        sizes,
        memory,
        date,
        preview: previewFile ? previewFile.filename : null,
        file_name: modelFile.filename,
        access_to_download,
      }, { transaction });

      await Model_user.create({
        user_id: parseInt(user_id, 10),
        model_id: newModel.id,
      }, { transaction });

      if (categories) {
        const categoryIds = JSON.parse(categories);
        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
          const categoryRecords = categoryIds.map(category_id => ({
            model_id: newModel.id,
            category_id: parseInt(category_id, 10)
          }));
          await Model_Category.bulkCreate(categoryRecords, { transaction });
        }
      }

      await transaction.commit();

      res
        .status(201)
        .json({ message: "Model uploaded successfully.", model: newModel });
    } catch (error) {
      await transaction.rollback();
      console.error("Error uploading model:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

module.exports = router;
