const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("../templates/todo.ejs", { todos: req.session.todos });
});

router.post("/add", (req, res) => {
  const { error } = validateAdd(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = { id: req.session.todos.length + 1, text: req.body.text };
  //add a todo
  req.session.todos.push(todo);
  res.redirect(303, "/todo");
});

router.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let todo = req.session.todos.find(el => el.id === id);
  if (!todo) return res.status(404).send("id not found");

  req.session.todos = req.session.todos.filter(el => el.id !== id);

  res.redirect(303, "/todo");
});

router.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let todo = req.session.todos.find(el => el.id === id);
  if (!todo) return res.status(404).send("id not found");

  todo.text = req.body.text;
  todo.id = id;

  req.session.todos = req.session.todos.map(el => (el.id === id ? todo : el));
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
