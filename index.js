const express = require("express");
const todo = require("./routes/todo");
const app = express(); // app

app.use(express.json()); //middelware
app.use(express.urlencoded({ extended: true }));
app.use("/todo", todo); //route todo
app.use((req, res) => {
  res.redirect(303, "/todo");
  res.end();
});

app.listen(5000);
