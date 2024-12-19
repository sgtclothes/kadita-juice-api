const multer = require("multer");
const multerConfig = require("../config/multer.config");

const upload = multer({
    storage: multerConfig.storage,
    fileFilter: multerConfig.fileFilter,
    limits: multerConfig.limits,
});

module.exports = upload;
