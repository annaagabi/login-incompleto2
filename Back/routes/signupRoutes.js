const express = require('express')
const router = express.Router()

const createDBConnection = require('../db')

const db = createDBConnection() 

const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

// URL base do cadastro: http://localhost:8081/signup/
/*
Modelo para testes no postman: 

{
    "name": "atualizou",
    "email": "atualizacao@gmail.com",
    "password": "adhgasg"
}
*/

// // Rotas da API

router.post('/', (req, res) => {
    const{name, email, password } = req.body

    if(!name || !email || !password){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }
    if(name === password){
        return res.status(400).json({message: 'A senha não pode ser igual ao nome'})
    }
    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if(!email.match(emailpattern)){
        return res.status(400).json({message: 'Email inválido'})
    }
    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    /*
      (?=.*\d)              // deve conter ao menos um dígito
    (?=.*[a-z])           // deve conter ao menos uma letra minúscula
    (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
    (?=.*[$*&@#])         // deve conter ao menos um caractere especial
    [0-9a-zA-Z$*&@#]{12,}  // deve conter ao menos 12 dos caracteres mencionados
$/ */

    if(!password.match(passwordpattern)){
        return res.status(400).json({message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 12 dos caracteres'})
    }

    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];
 
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else{
            res.status(201).json({message: 'Dados inseridos no sistema com sucesso'}) 
        }
        // res.status(201).json(data);
    });
});

router.get('/', (req, res) => {
    const sql = "SELECT id, name, email, password FROM login";
    const values = [req.body.id, req.body.name, req.body.email, req.body.password];
    
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            else{
                res.status(201).json(data);
            }
            // res.status(201).json(data);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
        const sql = "SELECT id, name, email, password FROM login WHERE id = ?";
        const values = [id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Login não encontrado' });
            }
            res.status(200).json(data[0]);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const{name, email, password } = req.body

    if(!name || !email || !password){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }
    if(name === password){
        return res.status(400).json({message: 'A senha não pode ser igual ao nome'})
    }
    const emailpattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if(!email.match(emailpattern)){
        return res.status(400).json({message: 'Email inválido'})
    }
    const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    /*
      (?=.*\d)              // deve conter ao menos um dígito
    (?=.*[a-z])           // deve conter ao menos uma letra minúscula
    (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
    (?=.*[$*&@#])         // deve conter ao menos um caractere especial
    [0-9a-zA-Z$*&@#]{12,}  // deve conter ao menos 12 dos caracteres mencionados
$/ */

    if(!password.match(passwordpattern)){
        return res.status(400).json({message: 'Senha inválida, a senha deve conter: 1 letra minúscula, 1 letra maiúscula, 1 caractere especial, 1 número, 12 dos caracteres'})
    }

    const sql = "UPDATE login SET name = ?, email = ?, password = ? WHERE id = ?";
    const values = [name, email, password, id];
     
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Login não encontrado' });
            }
            res.status(200).json({message: 'Dados atualizados do sistema com sucesso'});
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
        const sql = "DELETE FROM login WHERE id = ?";
        const values = [id];
         
        db.query(sql, values, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'Login não encontrado' });
            }
            res.status(200).json({message: 'Dados deletados do sistema com sucesso'});
            });
        });
 
module.exports = router;

// router.post('/', (req,res) => {
//     const { name, email, password } = req.body;
 
//         // Verifica se há campos em branco
//         if (!name || !email || !password) {
//             return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
//         }
 
//         const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
//         const values = [name, email, password];

//     try {
//         db.query(sql, values, (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(201).json({ message: 'Dados inseridos com sucesso' });
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.get('/', (req,res) =>{
//     const sql = "SELECT * FROM signup"
//     db.query(sql, (err, result) =>{
//         if(err) return res.json({Message: "Error inside server"})
//         return res.json(result)
//     })
// })
