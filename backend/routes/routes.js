const express= require('express');
const { testingControllerRequestHandler, addingVaues, getMessagesForRoom } = require('../controller/crudcontroller');
const { addGroup } = require('../controller/groupController');

const router=express.Router();


router.get("/", testingControllerRequestHandler);
router.post("/send", addingVaues) ;
router.get("/messages/:roomId",getMessagesForRoom)

router.get("/groups",addGroup) 
router.post("/groups",addGroup) 
// router.post("/submit",sendMessage);
// router.post("/senddata",)

module.exports=router;