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

app.use('/static',express.static(__dirname + '/public'));

app.get('/algumacoisa',function(req,res){
     res.send("Olá...antes não era nada, agora estou vivo!!!")
})

app.get('/login',function(req,res){
     res.render('login')
})

app.get('/retorno',function(req,res){
    res.send('alo')

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

app.listen(2000);

//esse blobo é disparado pelo enviar do fourmulario

app.post('/cadUsuario',function(req,res){
     usuario.create({
          nome:req.body.nome,
          senha:req.body.senha
     }).then(function(){
          res.send("Cadastro com Sucesso")
     }).catch(function(erro){
          res.send("Erro"+erro)
     })
})



