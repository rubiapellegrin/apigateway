var http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const helmet = require('helmet');
const cors = require('cors');

const app = express()

// Parte da segurança
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors());

// importando o controle de segurança
const seguranca = require('./seguranca')

const editorasServiceProxy = httpProxy('https://editoras.herokuapp.com/');
const livrosServiceProxy = httpProxy('https://livrosapi.herokuapp.com');

app.all('/editoras(/*)?', seguranca.verificaJWT, editorasServiceProxy);
app.all('/livros(/*)?', seguranca.verificaJWT, livrosServiceProxy);

// rota do login
app
  .route("/api/login")
  .post(seguranca.login)   

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var server = http.createServer(app);
server.listen(process.env.PORT || 3001);
