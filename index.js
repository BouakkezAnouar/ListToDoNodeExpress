const express = require("express");
const todo = require("./routes/todo");
const session = require("cookie-session");
const app = express(); // app

app.use(session({ secret: "todotopsecret" }));
app.use((req, res, next) => {
  if (typeof req.session.todos == "undefined") req.session.todos = [];
  next();
});
app.use(express.json()); //middelware
app.use(express.urlencoded({ extended: true }));
app.use("/todo", todo); //route todo
app.use((req, res) => {
  res.redirect(303, "/todo");
  res.end();
});

app.listen(5000);
