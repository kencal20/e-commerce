const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true }
});

export const Category = mongoose.model('Category', categorySchema);