const express = require("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const usuario = require("./models/usuario")

//configurar handle bar 
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')
//configurar o motor de tamplate handlebar
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/static', express.static(__dirname + '/public'));

app.get('/algumacoisa',function(req,res){
     res.send("Olá...antes não era nada, agora estou vivo!!!")
})


app.get('/',function(req,res){
     res.render('paginainicial')
})

app.get('/cadastro',function(req,res){
      res.render('cadastro')
})

app.get('/doeagora',function(req,res){
     res.render('doeagora')

})

app.get('/login',function(req,res){
     res.render('login')
})


//esse blobo é disparado pelo enviar do fourmulario

app.post('/cadastro',function(req,res){
     usuario.create({
          nome:req.body.nome,
          senha:req.body.senha
     }).then(function(){
           usuario.findAll().then(function(doadores){
           res.render('formulario',{doador: doadores.map(pagamento => pagamento.toJSON())})
        })
     }).catch(function(erro){
          res.send("Erro"+erro)
     })
})

/*A partir daqui começam as rotas do express*/

//este bloco e disparado pela url do navegador e buscar o formulario.handlebars
app.get('/formulario',function(req,res){
    usuario.findall().then(function(doadores){
         res.render('formulario',{doador: doadores.map(
              pagamento => pagamento.toJSON())})
    })
})


app.get('/delete/:id',function(req,res){
     usuario.destroy({
          where:{'id':req.params.id}
     }).then(function(){
          usuario.findAll().then(function(doadores){
               res.render('formulario',{doador: doadores.map(
                    pagamento => pagamento.toJSON())})
                    })

                    .catch(function(){res.send("nao deu certo")
      })
   })
})


//Vamos criar uma rota e ela dara para um formulario
app.get('/update/:id',function(req,res){
    usuario.findAll({ where:{'id':req.params.id}}).then(function(doadores){
         res.render('atualiza',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
})

//Depois vamos criar essa rota que envia para o banco e depois chama o formulario 
app.post('/updateUsuario',function(req,res){
     usuario.update({Nome:req.body.nome,senha:req.body.senha},{
       where:{id:req.body.codigo}}
       ).then(function(){
           usuario.findAll().then(function(doadores){
              res.render('formulario',{doador: doadores.map(pagamento => pagamento .toJSON())})
           })
}).catch(function(erro){
     res.send("Erro" + erro)
})

})


app.listen(3000);



