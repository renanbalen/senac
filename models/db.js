/*
   O db.js é um script em javascript que instancia o OCR, responsavel
 por criar a interface com o banco de dados nesse arquivo
deve se colocar as informações do banco de dados que se pretende conectar no projeto.
*/
//Inicializa o sequelize dando um require

const Sequelize = require("sequelize")

//Instancia o sequelize, passando um argumento, as credenciais do banco 

const sequelize = new Sequelize('projetopi','root','',{
    host:'localhost',
    dialect:'mysql'
})

//Exporta o db para ser utilizado nas demais models, como a do usuario
module.exports = {
     Sequelize:Sequelize,
     sequelize:sequelize
}
