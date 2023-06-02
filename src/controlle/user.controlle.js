const Io = require("../utils/Io");
const User = require("../module/User");
const Users = new Io("./database/user.json");
const jwt = require("jsonwebtoken");

const postFunc = async (req, res) => {
    const {username, password} = req.body;
  
    const users = await Users.read();
  
    const findUser = users.find((user) => username === user.username);
  
    if (findUser){

        return res.status(409).json({message: "User already exists"});

    } else {

        const id = (users[users.length - 1]?.id || 0) + 1;
        const newUser = new User(id, username, password);
    
        const data = users.length ? [...users, newUser] : [newUser];
    
        await Users.write(data);
    
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({id: newUser.id}, secretKey);
        res.status(200).json({message: "Success", token});
    };
};

module.exports = {
    postFunc,
};