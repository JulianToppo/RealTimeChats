const express= require('express');
const { testingControllerRequestHandler, addingVaues, getMessagesForRoom, sendMessage } = require('../controller/crudcontroller');
const { addGroup, getGroups } = require('../controller/groupController');
const { loginUser } = require('../controller/authController');

const router=express.Router();


router.get("/", testingControllerRequestHandler);
// router.post("/send", addingVaues) ;
router.get("/messages/:roomId",getMessagesForRoom)
router.post("/send",sendMessage)

router.get("/groups",getGroups) 
router.post("/groups",addGroup) 

router.post("/login", loginUser);
// router.post("/senddata",)

module.exports=router;
