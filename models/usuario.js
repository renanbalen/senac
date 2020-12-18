/*
   o arquivo usuario.js é um models, ou seja, um modelo da tabela de nome igual,
    localizada no banco de dados,cujo propsito é "interfacear" com o front-end, usando OCR.
*/
const db = require('./db')

const usuario = db.sequelize.define('usuario',{
     nome:{
         type:db.Sequelize.STRING
     },
     senha:{
         type:db.Sequelize.STRING
     }
    })
    //criatabela somente uma vez
    //usuario.sync({force:true})

    module.exports = usuario
