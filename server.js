const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const port = process.env.PORT || 8080;

let app = express();
app.use("/", serveStatic(path.join(__dirname)))
  .listen(port, () => console.log("Listening on " + port));

// Because we turn history mode on
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
