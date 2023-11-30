require("dotenv").config();

let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use((req, res, next) => {
  console.log(`${req.method} / ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("Hello World");

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

process.env.MESSAGE_STYLE = "uppercase";

app.get("/json", function (req, res) {
  process.env.MESSAGE_STYLE == "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res, next) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", (req, res) => {
  /*   let name = req.body.first + " " + req.body.last; */
  res.json({ name: req.body.first + " " + req.body.last });
});

module.exports = app;
