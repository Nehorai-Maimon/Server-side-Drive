const express = require('express'),
    cors = require('cors'),
    app = express(),
    swaggerFile = require("./swagger/swaggerOutput.json"),
    swaggerUi = require("swagger-ui-express"),
    multer = require("multer"),
    fs = require("fs")
// userRoutes= require('./user/userRoutes');

app.use(cors())
app.use(express.json())

const PORT = 3000

// app.use("/user", userRoutes)

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./collection")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })


//    const upload = multer()

app.post("/single", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.send("single was sent successfully")
});

// TODO: only single is working, multiple not working

app.post('/multiple', upload.array("files"), (req, res) => {
    console.log(req);
    console.log(req.file);
    console.log(req.files);
    res.send("multiple was sent successfully")
})

// TODO: bring back only the string..not the file

app.get("/myCollection", (req, res) => {
    const files = fs.readdirSync("./collection")
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(PORT, () => console.log("server is runing on port " + PORT))
require("./db").connect();

