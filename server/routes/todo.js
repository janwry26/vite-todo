const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const getNextCounterValue = require("./counterUtils");

router.post("/add", async (req, res) => {

    const { title, date } = req.body;
    
    try {
        const id = await getNextCounterValue("todo_collection", "count");

        const todo = new Todo({ id, title, date });
        await todo.save();
        res.send("Todo #" + id + " added");
        
    } catch (err) {
        res.send(err + "\nFailed to add todo");
    }
    
});

router.get("/view", async (req, res) => {
    Todo.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/view/:id", async (req, res) => {
    Todo.findOne({id: req.params.id})
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/edit/:id", async (req, res) => {
    Todo.findByIdAndUpdate({ id: req.params.id }, {
        title: req.body.title,
        date: req.body.date
    })
    .then(() => {
        res.send("Todo updated successfully");
    })
    .catch((err) => res.send(err + "\nFailed to update todo"));
});

router.delete('/delete/:id', async (req, res) => {
    await Todo.findByIdAndRemove({ _id: req.params.id})
        .then((doc) => res.send("Todo deleted successfully"))
        .catch((err) => res.send(err + "\nFailed to delete todo"));
});


module.exports = router;
