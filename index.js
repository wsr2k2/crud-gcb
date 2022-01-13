const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config()

const Conn = require("./model/conn/index");

Conn();

app.get('/', (req, res) => {
  res.status(200).json("Aplicacao rodando")
})

const obrasRouter = require('./routers/obras.routes');
app.use('/', obrasRouter)

app.listen(process.env.PORT, () => {
console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
