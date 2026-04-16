const express= require('express');
const { testingControllerRequestHandler, addingVaues, getMessagesForRoom } = require('../controller/crudcontroller');

const router=express.Router();


router.get("/", testingControllerRequestHandler);
router.post("/send", addingVaues) ;
router.get("/messages/:roomId",getMessagesForRoom)
// router.post("/submit",sendMessage);
// router.post("/senddata",)

module.exports=router;