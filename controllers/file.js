const FileModel = require("../models/file");
const mailService = require("../services/mailService")
const fileUploadService = require("../services/uploadService")// Filename in your form data

const uploadFile = async (req, res) => {
    // use the function / instance to upload the file
    const upload = fileUploadService.single("file");
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
    try {
        const fileId = req.params.uuid;
        const file = await FileModel.findById(fileId);
        if (!file) {
          //if DB Doesn't have this file information
          return res.end("File with given ID not found");
        }
        res.download(file.path, file.originalFilename);
      } catch (err) {
        res.end("Something went wrong, please try again after sometime");
      }
};

const sendFile = async (req, res) => {
    console.log(req.body);
  const { fileId, shareTo } = req.body;
    const downloadableLink = "http://localhost:5000/files/download/" + fileId;
    
    const info = await mailService.sendMail({
        from: 'process.env.userEmail', // sender address
        to: shareTo, // list of receivers
        subject: "A new file has been shared from File Sharing Platform", // Subject line
        html: `
        <html>
        <head>
        </head>
        <body>
          Your friend has shared a new file with you click the below link to download the file
        <br />
        <a href="${downloadableLink}">Click Here</a>
        </body>
        </html>
        `,
      });

      console.log("Message sent: %s", info.messageId);

    res.json({
        success: true,
        message: "File shared on email successfully"
    })
};

const fileController = {
    uploadFile,
    generateDynamicLink,
    downloadFile,
    sendFile,
};

module.exports = fileController;