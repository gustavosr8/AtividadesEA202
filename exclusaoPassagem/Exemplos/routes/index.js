var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOp = require('../models/mongo');

// codigo abaixo adicionado para o processamento das requisições
// HTTP GET, POST, PUT, DELETE

function checkAuth(req, res) {
  cookies = req.cookies;
  console.log(cookies);
  if(! cookies || ! cookies.userAuth) return 'unauthorized';
  cauth = cookies.userAuth;
  var content = JSON.parse(cauth);
  var key = content.key;
  var role = content.role;
  if(key == 'secret') return role
  return 'unauthorized';
}

// index.html
router.route('/') 
 .get(function(req, res) {  // GET
   var path = 'index.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );
/*
router.route('/alunos')   // operacoes sobre todos os alunos
 .get(function(req, res) {  // GET
     if(checkAuth(req, res) == 'unauthorized') {
       res.status(401).send('Unauthorized');
       return;
     }
     var response = {};
     mongoOp.find({}, function(erro, data) {
       if(erro)
          response = {"resultado": "falha de acesso ao BD"};
       else
          response = {"alunos": data};
        res.json(response);
        }
      )
    }
  )
  .post(function(req, res) {   // POST (cria)
     if(checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');
       return;
     }
     var query = {"ra": req.body.ra};
     var response = {};
     mongoOp.findOne(query, function(erro, data) {
        if (data == null) {
           var db = new mongoOp();
           db.ra = req.body.ra;
           db.nome = req.body.nome;
           db.curso = req.body.curso;
           db.save(function(erro) {
             if(erro) {
                 response = {"resultado": "falha de acesso ao BD"};
                 res.json(response);
             } else {
                 response = {"resultado": "aluno inserido"};
                 res.json(response);
              }
            }
          )
        } else {
	    response = {"resultado": "aluno ja existente"};
            res.json(response);
          }
        }
      )
    }
  );
*/
var ID='';



router.route('/usuarios/:nome/:IDpassagem')
  .get(function(req, res) {   // GET
      if(checkAuth(req, res) == 'unauthorized') {
        res.status(401).send('Unauthorized');
        return;
      }
      var response = {};
      var query = {"nome": req.params.nome};
      mongoOp.findOne(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
        else if (data == null) response = {"resultado": "usuario inexistente"};
	      else{
          var passagens = data.IDpassagens ;
          response = {"usuario": [data]};
          for(let i in passagens){
            if(passagens[i] == req.params.IDpassagem){
              ID += passagens[i];
              break;
            }
          }
          if(ID == '') response = {"resultado": "passagem nao encontrada. Verifique se o ID e o nome do comprador estão corretos"};
          ID = ID.split("P");
        } 

         res.json(response);
        }
      )
    }
  );

  router.route('/viagens')
  .get(function(req, res) {   // GET
      if(checkAuth(req, res) == 'unauthorized') {
        res.status(401).send('Unauthorized');
        return;
      }
      var response = {};
      var query = {"IDviagem": ID[0]};
      var data = {}
      mongoOp.findOneAndUpdate(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
        else if (data == null) response = {"resultado": "usuario inexistente"};
	      else{
          var passagens = data.IDpassagens ;
          response = {"usuario": [data]};
          for(let i in passagens){
            if(passagens[i] == req.params.IDpassagem){
              ID += passagens[i];
              break;
            }
          }
          if(ID == '') response = {"resultado": "passagem nao encontrada. Verifique se o ID e o nome do comprador estão corretos"};
          ID = ID.split("P");
        } 

         res.json(response);
        }
      )
    }
  );  
  /*
  .put(function(req, res) {   // PUT (altera)
       if(checkAuth(req, res) != 'admin') {
         res.status(401).send('Unauthorized');
         return;
      }
      var response = {};
      var query = {"nome": req.params.nome};
      var data = {"nome": req.body.nome, "curso": req.body.curso};
      mongoOp.findOneAndUpdate(query, data, function(erro, data) {
          if(erro) response = {"resultado": "falha de acesso ao DB"};
	  else if (data == null) response = {"resultado": "aluno inexistente"};
          else response = {"resultado": "aluno atualizado"};
          res.json(response);
        }
      )
    }
  )
  .delete(function(req, res) {   // DELETE (remove)
     if(checkAuth(req, res) != 'admin') {
        res.status(401).send('Unauthorized');
        return;
     }
     var response = {};
     var query = {"ra": req.params.ra};
      mongoOp.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao DB"};
	 else if (data == null) response = {"resultado": "aluno inexistente"};
         else response = {"resultado": "aluno removido"};
         res.json(response)
         }
       )
     }
  );
  */
  router.route('/viagens/:IDviagem')
  .get(function(req, res) {   // GET
      if(checkAuth(req, res) == 'unauthorized') {
        res.status(401).send('Unauthorized');
        return;
      }
      var response = {};
      var query = {"nome": req.params.nome};
      mongoOp.findOne(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "usuario inexistente"};
	 else response = {"usuario": [data]};
         res.json(response);
        }
      )
    }
  );

module.exports = router;
