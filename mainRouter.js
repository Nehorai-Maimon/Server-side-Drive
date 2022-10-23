const express = require('express'),
    router = express.Router(),
    fileRouter = require("./fileRouter");

router.use("./files", fileRouter)


