const express = require("express");
const mongoose = require("mongoose");

const fileRoutes = require("./routes/file");

const app = express();
// const app = express.urlencoded();
const PORT = 5000;


mongoose
    .connect("mongodb://localhost:27017/filesharingapp")
    .then(() => console.log("DB Connection established successfully"))
    .catch((err) => console.log("Error while connecting database", err));

    app.use(fileRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port", + PORT);
})