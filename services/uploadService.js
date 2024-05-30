const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const path = require("path");

const uploadDirectoryPath = path.join(__dirname, "..", "fileStorage");

console.log(uploadDirectoryPath);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectoryPath)
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename)
    },
});

const upload = multer({
    storage: storage,
});  

module.exports = upload;