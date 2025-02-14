// const { Sequelize} = require('sequelize')

// const sequelize= new Sequelize('clarke_energia', "root" , "",{
//     host:"localhost",
//     dialect: "mysql",
//     port: 3306,
// })

// try{
//     sequelize.authenticate()
//     console.log("conecatado com sucesso")
// } catch(err){
//     console.log(`não foi possivel conectar: ${err}`)
// }

// module.exports = sequelize

require('dotenv').config(); // Importa as variáveis do .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false, // Desativa logs do Sequelize
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conectado com sucesso ao banco de dados!");
    } catch (err) {
        console.error(" Não foi possível conectar:", err);
    }
})();

module.exports = sequelize;
