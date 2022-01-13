const express = require('express');
const router = express.Router();
const Obras = require("./../model/obras")

let obras = [{
  titulo: "O senhor dos aneis",
  editora: "editora",
  foto: "url.foto",
  autores: ["autor 1", "autor 2"]
}]

router.get('/obras/', async (req,res) => {
  await Obras.find({}).then((obras) => {
      res.status(200).json(obras);
  }).catch((err) => {
      res.status(204).json({message:"Nada foi encontrado"});
  });
});

router.post("/obras", async (req,res) => {
  try {
      
      const obra = req.body;
      
      // validação para não permitir que tenham campos em branco
      if(!obra.titulo){
          res.status(400).json({message:"Titulo obrigatorio"});
          return;
      }
      if(!obra.editora){
          res.status(400).json({message:"editora obrigatorio"});
          return;
      }
      if(!obra.foto){
          res.status(400).json({message:"foto obrigatorio"});
          return;
      }
      if(!obra.autores){
        res.status(400).json({message:"autores obrigatorio."});
        return;
    }
      const cadastro = await new Obras(obra).save();
      res.status(201).json({message: `Obra: ${obra.titulo}, cadastrada com sucesso!`});
  } catch(err) {
      res.status(400).json({message: "Algo deu errado!"})
  }
})

router.put("/obras/:id", async (req,res) => {
  const id = req.params.id;
  
      if(!req.body.titulo){
              res.status(400).json({message:"titulo obrigatorio"});
              return;
          }
          if(!req.body.editora){
              res.status(400).json({message:"editora obrigatorio"});
              return;
          }
          if(!req.body.foto){
              res.status(400).json({message:"foto obrigatorio"});
              return;
          }
          if(!req.body.autores){
            res.status(400).json({message:"autores obrigatorio"});
            return;
        }
      await Obras.updateOne({ _id:id}, req.body).then(() =>{
      
          res.status(200).json({message: `Obra: ${req.body.titulo}, alterada com sucesso!`});
  
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "Obra não encontrada, digite o ID corretamente."})
  })
})


router.delete("/obras/:id", async (req,res) => {
  if(req.params.id.length == 24){
      await Obras.deleteOne({_id:req.params.id}).then(() => {
      res.status(200).json({message: `Obra excluída com sucesso!`});
  }).catch((err) => {
      console.error(err);
      res.status(400).json({message: "algo deu errado"});
  });
}else{
  res.status(400).json({message: "id precisa ter 24 caracteres"});
}
});

module.exports = router;