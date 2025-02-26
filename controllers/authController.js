const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    // Método GET para login
    login(req, res) {
        res.status(200).json({ message: 'Rota de login' }); // Retorna uma mensagem de sucesso
    }

    // Método POST para login
    async loginPost(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Senha incorreta' });
            }

            // Gerar um token JWT para o usuário
            const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });

            // Armazenar o token na sessão ou cookie
            res.cookie('authToken', token, { httpOnly: true });

            res.status(200).json({ message: 'Login realizado com sucesso!', token }); // Retorna a resposta em JSON
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Método GET para registro
    register(req, res) {
        res.status(200).json({ message: 'Rota de registro' }); // Retorna uma mensagem de sucesso
    }

    // Método POST para registro
    // async registerPost(req, res) {
    //     const { username, password, confirmPassword } = req.body;

    //     if (password !== confirmPassword) {
    //         return res.status(400).json({ message: 'As senhas não coincidem' });
    //     }

    //     try {
    //         const hashedPassword = await bcrypt.hash(password, 10);

    //         const newUser = await User.create({
    //             username,
    //             password: hashedPassword
    //         });

    //         // Após criar o usuário, fazer o login automaticamente
    //         const token = jwt.sign({ id: newUser.id }, 'secretkey', { expiresIn: '1h' });

    //         res.cookie('authToken', token, { httpOnly: true });

    //         res.status(201).json({ message: 'Usuário registrado com sucesso!', token }); // Resposta de sucesso com token
    //     } catch (error) {
    //         res.status(500).json({ message: 'Erro ao registrar usuário' });
    //     }
    // }


    async registerPost  (req, res) {
        try {
            console.log("Dados recebidos:", req.body);
            const { name, email, password } = req.body;
    
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
            }
    
            const user = await User.create({ name, email, password });
    
            res.status(201).json({ message: "Usuário criado com sucesso!", user });
    
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            res.status(500).json({ error: "Erro ao registrar usuário" });
        }
    };
    
    
    
    // Método GET para logout
    logout(req, res) {
        res.clearCookie('authToken'); // Limpa o token do cookie
        res.status(200).json({ message: 'Logout realizado com sucesso' }); // Retorna mensagem em JSON
    }
}

module.exports = new AuthController();
