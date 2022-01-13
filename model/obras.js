const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const obrasModel = new mongoose.Schema({
    titulo: { type:String, required: true },
    editora: { type: String, required: true },
    foto: {type: String, required: true },
    autores: {type:String, required: true }
});

const Obra = mongoose.model("obras", obrasModel);

module.exports = Obra;