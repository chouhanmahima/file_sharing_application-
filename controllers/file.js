const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const FileModel = require("../models/file");

//Configuring file storage
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
}).single("file");  // Filename in your form data

const uploadFile = async (req, res) => {
    // use the function / instance to upload the file
    upload(req, res, async (error) => {
        // console.log(req.body);
        if (error) {
            console.log("ERROR WHILE UPLOADING FILE", error);
            return;
        }
        // Save the file in DB
        // console.log(req.file);
        const newFile = new FileModel({
            originalFilename: req.file.originalname,
            newFilename: req.file.filename,
            path: req.file.path,
        });

        const newlyInsertedFile = await newFile.save();

        console.log("File uploaded successfully !");
        res.json({
            success: true,
            message: "File uploaded successfully !",
            fileId: newlyInsertedFile._id,
        });
    });
};

const generateDynamicLink = async (req, res) => {

    try {
        const fileId = req.params.uuid;
        const file = await FileModel.findById(fileId);
        if (!file) {
            //if DB Doesn't have this file information
            return res.status(404).json({
                success: false,
                message: "File with given ID not found",
            });
        }
        console.log(fileId);
        res.json({
            success: true,
            message: "Generate dynamic link file API",
            result: "http://localhost:5000/files/download/" + fileId,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again after sometime",
        });
    }

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