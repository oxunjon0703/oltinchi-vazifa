const Io = require("../utils/Io");
const Blog = require("../module/Blogs");
const Blogs = new Io("./database/blogs.json");
const Users = new Io("./database/user.json");
const jwt = require("jsonwebtoken");

const getFunc = async (req, res) => { 

    const {id: user_id} = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_KEY);

  const blogs = await Blogs.read();

  const myBlogs = blogs.filter((blog) => blog.user_id === user_id);
  const users = await Users.read();
  const findUser = users.find((user) => user.id == user_id);
  const allBlogs = myBlogs.map((blog) => {
    blog.user_id = findUser;
    return blog;
  });

  res.status(200).json(allBlogs);
};

const postFunc = async (req, res) => {

    const {title, text} = req.body;
    const token = req.headers.authorization.split(" ")[1];

    const blogs = await Blogs.read();
  
    const {id: user_id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = (blogs[blogs.length - 1]?.id || 0) + 1;
    const newBlog = new Blog(id, title, text, user_id);
  
    const data = blogs.length ? [...blogs, newBlog] : [newBlog];
    Blogs.write(data);
  
    res.status(201).json({message: "Success"});
};

const putFunc = async (req, res) => {

    const {id: user_id} = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_KEY);

    const blogs = await Blogs.read();

    const myBlogs = blogs.filter((blog) => blog.user_id === user_id);
    console.log(myBlogs);
    
    for(let i = 0; i < myBlogs.length; i++) {
        const {title, text} = req.body;
        const newBlog = myBlogs[i];
        
        title ? (newBlog.title = title) : newBlog.title;
        text ? (newBlog.text = text) : newBlog.text;

        Blogs.write(myBlogs[i]);
    };

    res.status(200).json({message: "Success"});
};

const deletFunc = async (req, res) => {

    const { id } = req.body;

    const blogs = await Blogs.read();

    blogs.splice(id - 1, 1);

    Blogs.write(blogs);

    res.status(200).json({message: "Delete by id"});
};

module.exports = { 
    getFunc,
    postFunc,
    putFunc,
    deletFunc,
};