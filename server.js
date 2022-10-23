const { request } = require('http');

const express = require('express'),
    cors = require('cors'),
    app = express(),
    swaggerFile = require("./swagger/swaggerOutput.json"),
    swaggerUi = require("swagger-ui-express"),
    multer = require("multer");
    // mainRouter= require('./mainRouter');

app.use(cors())
app.use(express.json())

const PORT = 3000

// app.use("/", mainRouter)

const fileStorageEngine = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./files")
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

app.post("/single", upload.single("file"), (req, res)=>{
console.log(req.file);
res.send("single was sent successfully")
});

// TO DO: only single is working, multiple not working

app.post('/multiple', upload.array("files",3), (req, res)=>{
console.log(req.files);
res.send("multiple was sent successfully")
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(PORT , ()=> console.log("server is runing on port " + PORT ))

