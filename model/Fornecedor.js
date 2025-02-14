const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); 

const Fornecedor = sequelize.define('Fornecedores', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  custo_kwh: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  limite_min_kwh: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  num_clientes:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avaliacao: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  tableName: 'fornecedores',
  timestamps: false,
});

module.exports = Fornecedor;
