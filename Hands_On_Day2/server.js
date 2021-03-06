﻿//Pragati Arora
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

app.use('/api',require('./routes/api'))
app.listen(4747, () => {
    console.log("Server is running at http://localhost:4747");
    }); 

