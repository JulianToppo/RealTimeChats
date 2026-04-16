const express= require('express');
const { testingControllerRequestHandler, addingVaues } = require('../controller/crudcontroller');

const router=express.Router();


router.get("/", testingControllerRequestHandler);
router.post("/send", addingVaues) ;

// router.post("/submit",sendMessage);
// router.post("/senddata",)

module.exports=router;