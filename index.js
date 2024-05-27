const express = require("express");

const fileRoutes = require("./routes/file");

const PORT = 5000;

const app = express();

app.use(fileRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port", + PORT);
})