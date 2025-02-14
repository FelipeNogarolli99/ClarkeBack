const  Fornecedor  = require('../model/Fornecedor');
const fs = require('fs');
const path = require('path');

module.exports = class FornecedorController {
  static async create(req, res) {
    const { nome, estado, custo_kwh, limite_min_kwh, num_clientes, avaliacao } = req.body;
    const logo = req.file ? `/uploads/logos/${req.file.filename}` : null; 
    
    // Verificação básica para garantir que os campos obrigatórios sejam enviados
    if (!nome || !estado || !custo_kwh || !limite_min_kwh || !num_clientes || !avaliacao) {
      return res.status(422).json({ message: "Campos obrigatórios faltando." });
    }

    if (isNaN(custo_kwh) || isNaN(avaliacao) || isNaN(num_clientes) || isNaN(limite_min_kwh)) {
        return res.status(400).json({ message: "Campos de custo_kwh, limite_min_kwh, num_clientes e avaliacao devem ser numéricos." });
    }

    try {
      const novoFornecedor = await Fornecedor.create({
        nome,
        estado,
        custo_kwh: parseFloat(custo_kwh),
        limite_min_kwh: parseInt(limite_min_kwh),
        num_clientes: parseInt(num_clientes),
        avaliacao: parseFloat(avaliacao),
        logo,
      });

      res.status(201).json({
        message: "Fornecedor cadastrado com sucesso!",
        novoFornecedor,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao cadastrar o fornecedor." });
    }
  }

  // Método para pegar todos os fornecedores
  static async getAll(req, res) {
    try {
      const fornecedores = await Fornecedor.findAll({
        order: [['id', 'DESC']],  // Ordena pela data de criação
      });

      if (fornecedores.length === 0) {
        return res.status(404).json({ message: "Nenhum fornecedor encontrado." });
      }

      res.status(200).json({
        fornecedores,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao recuperar fornecedores." });
    }
  }

  // Método para remover fornecedor pelo ID
  static async removeById(req, res) {
    const id = req.params.id;

    try {
      // Verifica se o fornecedor existe
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado!' });
      }

      // Remove o fornecedor
      await Fornecedor.destroy({
        where: {
          id
        }
      });

      return res.status(200).json({ message: "Fornecedor removido com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao remover o fornecedor." });
    }
  }

  // Método para atualizar dados do fornecedor
  static async updateById(req, res) {
    const id = req.params.id;
    const { nome, estado, custo_kwh, limite_min_kwh, num_clientes, avaliacao } = req.body;
    const logo = req.file ? `/uploads/logos/${req.file.filename}` : null;

    try {
      // Verifica se o fornecedor existe
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado!' });
      }

      // Atualiza os dados
      await Fornecedor.update(
        {
          nome,
          estado,
          custo_kwh,
          limite_min_kwh,
          num_clientes,
          avaliacao,
          logo
        },
        {
          where: {
            id
          }
        }
      );

      return res.status(200).json({ message: "Fornecedor atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar o fornecedor." });
    }
  }

  static async getById(req, res) {
    const id = req.params.id;
    try {
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) {
        return res.status(404).json({ message: 'Fornecedor não encontrado!' });
      }
      return res.status(200).json(fornecedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar fornecedor." });
    }
  }
  
};
