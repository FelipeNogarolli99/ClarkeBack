// const User = require('../model/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // class AuthController {
// //     // Método GET para login
// //     static login(req, res){
// //         res.render("auth/login")
// //     }

// //     static register(req,res ){
// //         res.render('auth/register')
// //     }

    
// //      async loginPost  (req, res) {
// //         try {
// //             console.log("Dados recebidos no login:", req.body);
    
// //             const { email, password } = req.body;
// //             if (!email || !password) {
// //                 return res.status(400).json({ error: "Preencha todos os campos!" });
// //             }
    
// //             const user = await User.findOne({ where: { email } });
    
// //             if (!user) {
// //                 return res.status(401).json({ error: "Usuário não encontrado!" });
// //             }
    
// //             console.log("Usuário encontrado:", user);
    
// //             // Aqui pode estar o problema: a comparação de senha
// //             const isPasswordValid = password === user.password; // Se estiver usando hash, precisa comparar com bcrypt.compare
// //             if (!isPasswordValid) {
// //                 return res.status(401).json({ error: "Senha inválida!" });
// //             }
    
// //             res.status(200).json({ message: "Login realizado com sucesso!" });
    
// //         } catch (error) {
// //             console.error("Erro ao fazer login:", error);
// //             res.status(500).json({ error: "Erro no servidor" });
// //         }
// //     };
    

// //     // Método GET para registro
// //     register(req, res) {
// //         res.status(200).json({ message: 'Rota de registro' }); // Retorna uma mensagem de sucesso
// //     }

// //     // Método POST para registro
// //     // async registerPost(req, res) {
// //     //     const { username, password, confirmPassword } = req.body;

// //     //     if (password !== confirmPassword) {
// //     //         return res.status(400).json({ message: 'As senhas não coincidem' });
// //     //     }

// //     //     try {
// //     //         const hashedPassword = await bcrypt.hash(password, 10);

// //     //         const newUser = await User.create({
// //     //             username,
// //     //             password: hashedPassword
// //     //         });

// //     //         // Após criar o usuário, fazer o login automaticamente
// //     //         const token = jwt.sign({ id: newUser.id }, 'secretkey', { expiresIn: '1h' });

// //     //         res.cookie('authToken', token, { httpOnly: true });

// //     //         res.status(201).json({ message: 'Usuário registrado com sucesso!', token }); // Resposta de sucesso com token
// //     //     } catch (error) {
// //     //         res.status(500).json({ message: 'Erro ao registrar usuário' });
// //     //     }
// //     // }


// //     async registerPost  (req, res) {
// //         try {
// //             console.log("Dados recebidos:", req.body);
// //             const { name, email, password } = req.body;
    
// //             if (!name || !email || !password) {
// //                 return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
// //             }
    
// //             const user = await User.create({ name, email, password });
    
// //             res.status(201).json({ message: "Usuário criado com sucesso!", user });
    
// //         } catch (error) {
// //             console.error("Erro ao registrar usuário:", error);
// //             res.status(500).json({ error: "Erro ao registrar usuário" });
// //         }
// //     };
    
    
    
// //     // Método GET para logout
// //     logout(req, res) {
// //         res.clearCookie('authToken'); // Limpa o token do cookie
// //         res.status(200).json({ message: 'Logout realizado com sucesso' }); // Retorna mensagem em JSON
// //     }
// // }

// // module.exports = new AuthController();


class AuthController {
    static login(req, res) {
        res.render("auth/login");
    }

    static register(req, res) {
        res.render("auth/register");
    }

    static async loginPost(req, res) {
        try {
            console.log("📩 Dados recebidos no login:", req.body); // Verificar se os dados estão chegando corretamente
        
            const { email, password } = req.body;
            if (!email || !password) {
                console.log("❌ Campos vazios!");
                return res.status(400).json({ error: "Preencha todos os campos!" });
            }
    
            const user = await User.findOne({ where: { email } });
    
            if (!user) {
                console.log("❌ Usuário não encontrado:", email);
                return res.status(401).json({ error: "Usuário não encontrado!" });
            }
    
            console.log("✅ Usuário encontrado:", user);
    
            // Comparação correta da senha
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("🔍 Senha válida?", isPasswordValid);
    
            if (!isPasswordValid) {
                console.log("❌ Senha inválida!");
                return res.status(401).json({ error: "Senha inválida!" });
            }
    
            console.log("✅ Login realizado com sucesso!");
    
            return res.status(200).json({ message: "Login realizado com sucesso!" });
    
        } catch (error) {
            console.error("🔥 Erro ao fazer login:", error);
            return res.status(500).json({ error: "Erro no servidor" });
        }
    }

    static async registerPost(req, res) {
        try {
            console.log("Dados recebidos:", req.body);
            const { name, email, password } = req.body;
    
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
            }

            // Hash da senha antes de salvar no banco
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = await User.create({ name, email, password: hashedPassword });
    
            res.status(201).json({ message: "Usuário criado com sucesso!", user });
    
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            res.status(500).json({ error: "Erro ao registrar usuário" });
        }
    }

    static logout(req, res) {
        res.clearCookie('authToken');
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    }
}
module.exports = AuthController;

