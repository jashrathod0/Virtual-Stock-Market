const express = require('express');
const passport = require("passport");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require("./passport")(passport);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/user');

app.use('/user',usersRouter);


app.listen(port, ()=>{
   console.log(`Server is running on port: ${port}`) ;
});
