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