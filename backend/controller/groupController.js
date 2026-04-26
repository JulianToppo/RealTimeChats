const { broadcastToAll } = require("../utils/wsService");

let groups = [
    {
      id: "group-1",
      name: "General",
      admins: ["user-1"],
      members: ["user-1", "user-2"],
      createdAt: Date.now(),
    },
    {
      id: "group-2",
      name: "Random",
      admins: ["user-2"],
      members: ["user-1", "user-2", "user-3"],
      createdAt: Date.now(),
    },
  ];


  const getGroups = (req, res) => {
    const { userId } = req.query;
  
    // if (!userId) {
    //   return res.status(400).json({ error: "userId required" });
    // }
  
    //The user is part of the group based on two combinations
    // const userGroups = groups.filter(
    //   (group) =>
    //     group.members.includes(userId) ||
    //     group.admins.includes(userId)
    // );
  
    res.json(groups); // returing all the groups for now
  };

const addGroup = (req, res) => {
  
    const { name, admins = [] } = req.body;
  
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: "Group name required" });
    }
  
    if (!Array.isArray(admins) || admins.length === 0) {
      return res.status(400).json({ error: "At least one admin required" });
    }
  
    const uniqueAdmins = [...new Set(admins)];
  
    const newGroup = {
      id: "group-" + Date.now(),
      name: name.trim(),
      admins: uniqueAdmins,
      members: uniqueAdmins, // admins are members by default
      createdAt: Date.now(),
    };
  
    groups.push(newGroup);
  
    broadcastToAll(newGroup)
    res.status(201).json(newGroup);
  };


  module.exports={
    addGroup,
    getGroups
  }