const { Sequelize} = require('sequelize')

const sequelize= new Sequelize('clarke_energia', "root" , "",{
    host:"localhost",
    dialect: "mysql",
    port: 3306,
})

try{
    sequelize.authenticate()
    console.log("conecatado com sucesso")
} catch(err){
    console.log(`não foi possivel conectar: ${err}`)
}

module.exports = sequelize