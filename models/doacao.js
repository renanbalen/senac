const db = require('./db')

const cadastroDoacao= db.sequelize.define('cadastroDoacao',{
    categoria:{
        type:db.Sequelize.STRING
     },
     prioridade:{
         type:db.Sequelize.STRING
     },
     descricao:{
        type:db.Sequelize.STRING
     }
    
    
    })
    //criatabela somente uma vez
    //cadastroDoacao.sync({force:true})

    module.exports = cadastroDoacao
