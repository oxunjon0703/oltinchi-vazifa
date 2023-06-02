require("dotenv").config();
const express = require('express');
const [routes,blogs]= require("./routes");

const app = express();

app.use(express.json());
app.use(routes);
app.use(blogs);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(PORT);
});