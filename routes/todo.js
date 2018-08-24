const express = require("express");
const Joi = require("joi");
const router = express.Router();

let todos = [];

router.get("/", (req, res) => {
  res.render("../templates/todo.ejs", { todos: todos });
});

router.post("/add", (req, res) => {
  const { error } = validateAdd(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = { id: todos.length + 1, text: req.body.text };
  //add a todo
  todos.push(todo);
  console.log(todo);
  //back to /todo
  res.redirect(303, "/todo");
});

router.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let todo = todos.find(el => el.id === id);
  if (!todo) return res.status(404).send("id not found");

  todos = todos.filter(el => el.id !== id);
  res.redirect(303, "/todo");
});

router.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let todo = todos.find(el => el.id === id);
  if (!todo) return res.status(404).send("id not found");

  todo.text = req.body.text;
  todo.id = id;

  todos = todos.map(el => (el.id === id ? todo : el));
  res.redirect(303, "/todo");
});

validateAdd = todo => {
  const schema = {
    text: Joi.string()
      .required()
      .min(3)
  };
  return Joi.validate(todo, schema);
};

module.exports = router;
