const multer = require('multer');
const path = require("path");

// Configuração do multer para salvar o logo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images'); // Diretório para salvar o logo
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
    }
  });

  const upload = multer({ storage });

module.exports = upload; 