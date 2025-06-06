const express = require("express");
const router = express.Router();
const modelsController = require("../controllers/modelController");
const authenicate = require("../error/authenicate");
const { validateModel } = require("../middle/modelShema");

router.post("/", validateModel, modelsController.createModel);
router.get("/related/by-author", modelsController.getOtherModelsByAuthor);
router.get("/related/others", modelsController.getOtherModels);
router.get("/top-rated", modelsController.getTopRatedModels);
router.get("/:id", modelsController.getModelById);
router.put("/:id", validateModel, modelsController.updateModel);
router.delete("/:id", modelsController.deleteModel);
router.get("/", modelsController.getAllModels);
router.get("/download/:filename", modelsController.downloadModel);

module.exports = router;
