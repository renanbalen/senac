const express = require("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const usuario = require("./models/usuario")



//configurando multer pra fazer upload imagem
const multer = require("multer")

const storage = multer.diskStorage({
      destination:(req,file,cb) =>{cb(null,'public/imagens')},
      filename:(req,file,cb) => {cb(null,file.originalname)}
})

const upload = multer({storage})

///configuracao para envio de mail 
//const nodemailer = require('nodemailer');

/*const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
     secure: false, //true for 465, false for other ports
     auth: {
          user: "renan.balen@gmail.com",
          pass: "dellACERappleSONY1020"
      },
      tls: {rejectUnauthorized: false}
});*/

/*const mailOptions = {
     from: 'renan.balen@gmail.com',
     to: 'ricardobaiocco.17@gmail.com',
     subject: 'E-mail enviado usando Node',
     text: 'Bem fácil, não? ;)'
};*/

/*transporter.sendMail(mailOptions,  function(error, info){
     if(error){
         console.log(error);
     } else {
          console.log('Email enviado: ' + info.response);
     }
});*/















var session = require('express-session');
const cadastroDoacao = require("./models/doacao")
 app.use(session({
     secret: 'secret',
     resave: true,
     saveUninitialized: true
 }));

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


app.get('/paginainicial',function(req,res){
     res.render('paginainicial')
})

app.get('/cadastro',function(req,res){
      res.render('cadastro');
     
})

app.get('/doeagora',function(req,res){
     if(req.session.nome){
     res.render('doeagora')

}else{
     res.render('doeagora');
}

})

app.get('/login',function(req,res){
     res.render('login')
})



app.get('/logoff',function(req,res){
      req.session.destroy(function(){
      res.render('login')
      });

})

app.get('/cadastrodoacao',function(req,res){  
    

     if(req.session.email){
        //res.render('cadastrodoacao)
        usuario.findAll().then(function(doacoes){
            res.render('cadastrodoacao', {doador: doacoes.map(pagamento => pagamento.toJSON())})
        })

    }else{
        res.render('login')
    }
    
})

app.post('/cadUsuario',function(req,res){
     usuario.create({
         nome:req.body.nome,
          senha:req.body.senha,
          email:req.body.email,
        
      }).then(function(){
          usuario.findAll().then(function(doadores){
          res.render('cadastro', {doador: doadores.map(pagamento => pagamento.toJSON())})
      })
      }).catch(function(erro){
          res.send("Erro"+erro)
      })
  
  })

//criando a rota da session
app.post('/login',function (req,res){
     /*req.session.nome = 'andre';
     req.session.senha = 'repolho123'
     if(req.session.nome == req.body.email && req.body.senha == 'repolho123'){
         res.send ("usuario logado")
     }else{
         res.send ("usuario não existe")
     }
 })
 */
req.session.email = req.body.email;
usuario.count({where: { email: req.session.email }}).then(function(dados){
  if(dados >= 1){
     res.render('paginainicial')
  }else{
       res.send("usuario nao cadastrado" + dados)
  }
})

})
//esse blobo é disparado pelo enviar do fourmulario

app.post('/cadastro', upload.single('imagem_prod'),function(req,res){
   console.log(req.file.originalname);
     usuario.create({
          email:req.body.email,
          senha:req.body.senha,
          foto:req.file.originalname
     }).then(function(){
           usuario.findAll().then(function(doadores){
           res.render('cadastro',{doador: doadores.map(pagamento => pagamento.toJSON())})
        })
     }).catch(function(erro){
          res.send("Erro"+erro)
     })
})
//rota de criacao cadastro doacao
app.post('/cadDoacao',function(req,res){
     
       cadastroDoacao.create({
            categoria: req.body.categoria,
            prioridade: req.body.prioridade,
            descricao: req.body.descricao
            
       }).then(function(){
             cadastroDoacao.findAll().then(function(doacoes){
             res.render('cadastroDoacao',{doacao: doacoes.map(cadastro => cadastro.toJSON())})
          })
       }).catch(function(erro){
            res.send("Erro"+erro)
       })
  }) 

app.get('/cadDoacao',function(req,res){
     res.render('cadastroDoacao');
})
/*A partir daqui começam as rotas do express*/

//este bloco e disparado pela url do navegador e buscar o formulario.handlebars
app.get('/formulario',function(req,res){
    usuario.findall().then(function(doadores){
         res.render('formulario',{doador: doadores.map(
              pagamento => pagamento.toJSON())})
    })
})


app.post('/delete',function(req,res){
     usuario.destroy({
          where:{'id':req.body.id}
     }).then(function(){
          usuario.findAll().then(function(doadores){
               res.render('cadastro',{doador: doadores.map(
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
              res.render('cadastro',{doador: doadores.map(pagamento => pagamento .toJSON())})
           })
}).catch(function(erro){
     res.send("Erro" + erro)
})

})







app.listen(3000);



