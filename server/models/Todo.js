const mongoose = require("mongoose");
mongoose.pluralize(null);

const todoSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model("todo_collection", todoSchema);
