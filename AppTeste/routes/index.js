var express = require('express');
var router = express.Router();
const fs=require("fs");

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.route('/*') 
 .options(function(req, res) {  // OPTIONS
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Request-With');
   res.sendStatus(200);
   }
 );

// index.html
router.route('/')
 .get(function(req, res) {  // GET
   var path = 'index.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );

// base de alunos
const filename = "data.txt";
var alunos;

alunos = fs.readFileSync(filename, 'utf8');

alunos = JSON.parse(alunos);


router.route('/alunos')   // operacoes sobre todos os alunos
  .get(function(req, res) {  // GET
      var response = {"alunos": []};
      if (alunos.size == 0) {
       res.json(response);
       return;
      }
      for (var value of alunos) {
        response.alunos.push(value);
      }
      res.json(response);
      }
   )
  .post(function(req, res) {   // POST (cria)
      var aluno = req.body;
      var response = {};
      var existente = false;
      for(let a of alunos){
        if(a.ra === aluno.ra){
          response = {"resultado": "aluno ja existente"};
          existente = true;
        }
      }
      if(!existente){
        alunos.push(aluno);
        response = {"resultado": "aluno inserido"};
      }
      res.json(response);

      fs.writeFile(filename, JSON.stringify(alunos));

    }
 );


router.route('/alunos/:id')   // operacoes sobre um aluno (ID)
  .get(function(req, res) {   // GET
    var response = {};
    var existente = false;
    for(let a of alunos){
      if(a.ra === req.params.id ){
        response = a;
        existente = true;
      }
    }
    if(!existente){
      response = {"resultado": "aluno inexistente"};
    }
    res.json(response);

    fs.writeFile(filename, JSON.stringify(alunos));
    }
  )


  .put(function(req, res) {   // PUT (altera)
    
    var aluno = req.body
    var response = {};
    var existente = false;
    for(let index = 0, len = alunos.length; index < len; ++index){
      if(alunos[index].ra === req.params.id ){
        alunos[index] = aluno;
        response = {"resultado": "aluno atualizado"};
        existente = true;
        
      }
    }
    if(!existente){
      response = {"resultado": "aluno inexistente"};
    }
    res.json(response);

    fs.writeFile(filename, JSON.stringify(alunos));

    }
  )
  .delete(function(req, res) {   // DELETE (remove)
      
    var aluno = req.body
    var response = {};
    var existente = false;
    for(let index = 0, len = alunos.length; index < len; ++index){
      if(alunos[index].ra === req.params.id ){
        delete alunos[index];
        response = {"resultado": "aluno removido"};
        existente = true;
        
      }
    }
    if(!existente){
      response = {"resultado": "aluno inexistente"};
    }
    res.json(response);

    fs.writeFile(filename, JSON.stringify(alunos));

    }
  );



module.exports = router;
