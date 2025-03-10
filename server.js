const express = require('express');
const cors = require('cors');
const sequelize = require('./db/conn'); // Conexão com o banco



const app = express();
const PORT = process.env.PORT || 5000;

// Configura CORS para permitir requisições do seu front-end (na porta 5173)
app.use(cors());

// Converte o corpo da requisição para JSON
app.use(express.json());

// Testando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conectado com sucesso ao banco de dados');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

const SupplierRoutes = require("./routes/Supplier")
app.use(SupplierRoutes)

const AuthRoutes = require("./routes/authRoutes");
app.use("/auth", AuthRoutes);

// // Start do servidor
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();