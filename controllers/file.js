const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//configuration part
const uploadDirectoryPath = path.join(__dirname, "..", "fileStorage");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectoryPath)
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename)
    },
})

const upload = multer({
    storage: storage,
}).single("file");

const uploadFile = async (req, res) => {
    // use the function / instance to upload the file
    upload(req, res, (error) => {
        console.log(req.body);
        if (error) {
            console.log("ERROR WHILE UPLOADING FILE", error);
            return;
        }
        // Save the file in DB
        // console.log(req.file);
        console.log("File uploaded successfully !");
        res.json({
            success: true,
            message: "File uploaded successfully !"
        });
    });
};

const generateDynamicLink = async (req, res) => {
    res.json({
        success: true,
        message: "Generate dynamic link file API"
    })
};

const downloadFile = async (req, res) => {
    res.json({
        success: true,
        message: "download file API"
    })
};

const sendFile = async (req, res) => {
    res.json({
        success: true,
        message: "send file API"
    })
};

const fileController = {
    uploadFile,
    generateDynamicLink,
    downloadFile,
    sendFile,
};

module.exports = fileController;