// carregar o modulo express
// quando carregar o modulo faça associado a uma
// constante para evitar a alteração do conteudo
// e assim evitar erros de execucao .
const express = require("express");

const app = express();
//  o modulo body-parser nos ajuda a capturar os
// dados que virao no corpo de solicitacao e
// realiza a sua conversao para json .
// assim podemos manipular os dados
const bodyParser = require("body-parser");

// vamos iniciar os exemplos de utilizacao de
// verbos http

// GET
// quando o meu usuario deseja obter alguns dados
// do servidor
app.get("/dados", (req, res) => {
  res.send("voce esta sendo no verbo GET");
});

// POST
// utilizar quando o meu usuario envia algo ao
// servidor com o intuito de cadastrar ou
// realizar autenticacao
app.use(bodyParser.json());
app.post("/dados", (req, res) => {
  res.send(req.body);
});

// PUT

app.put("/dados", (req, res) => {
  res.send("voce esta no verbo PUT");
});
// utlizando quando o usuario deseja apagar algum dado
app.delete("/dados", (req, res) => {
  res.send("voce esta no verbo DELETE");
});

app.listen(3000);
console.log("servidor online");
