const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary.util");
const { BadRequest } = require("http-errors");
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."), false);
    }
};

const storageCloudinary = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "kadita-juice",
        allowed_formats: ["jpg", "png", "jpeg"],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const uploadCloudinary = multer({ storage: storageCloudinary });

const uploadImage = (file) => {
    if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequest("Invalid file type. Only JPEG, PNG, and JPG are allowed.");
    }
    if (file.size > MAX_SIZE) {
        throw new BadRequest("File size exceeds the maximum limit of 10 MB.");
    }
    return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
            {
                folder: "kadita-juice",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        upload.end(file.buffer);
    });
};

module.exports = {
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    uploadCloudinary,
    uploadImage,
};
