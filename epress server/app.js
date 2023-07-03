const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");

const app = express();

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})

app.listen(8080);
