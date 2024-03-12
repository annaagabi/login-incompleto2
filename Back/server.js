const express = require('express')

const cors = require('cors')

const createDBConnection = require('./db')

const db = createDBConnection() 

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: true}))

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida.');
});

db.query("SELECT id, name, email, password FROM login", function (err, rows, fields) {
    if (!err) {
        console.log("Resultado:", rows);
    } else {
        console.log('Erro: Consulta não realizada com sucesso!', err);
    }
});

const signupRoutes = require('./routes/signupRoutes')
const loginRoutes = require('./routes/loginRoutes')

app.use('/signup', signupRoutes)
// app.use('/login', loginRoutes)

const port = process.env.PORT || 8081

app.listen(port, ()=> {
    console.log(`Servidor iniciado na porta ${port}`)
})
app.get('/', (req,res) =>{
    res.json({message: 'Testando API'})
})


