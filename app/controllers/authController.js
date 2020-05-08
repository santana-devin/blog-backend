const router = require("express").Router();
const { Users } = require('../models');

module.exports =  {

async register(req, res) {
    const { name , username, password } = req.body;

    try {
      if (await Users.findOne({ where :{  username }})) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await Users.create(req.body);

      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: "User registration failed" });
    }
  },
  async authenticate(req, res){
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ where:{ username }});
        
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        }
        
        if (!(await Users.compareHash(password, user.password))) {
          return res.status(400).json({ error: "Invalid password" });
        }
        
        return res.json({
          user,
          token: await Users.generateToken(user)
        });        
    } catch (err) {
        return res.status(400).json({ error: "User authentication failed" });
    }
    },
    async dashboard(req, res){
        try {
          const { userId } = req;
          const user = await Users.findByPk(userId);
          return res.json({ user });
        } catch (err) {
            return res.status(400).json({ error: "Can't get user information" });
        }
    }
}