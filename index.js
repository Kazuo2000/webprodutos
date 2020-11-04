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

// para ler o arquivo de json que contem os
// produtos que desejo exibir Nós iremos
// carregar o modulo do fs(file system).
const fs = require("fs");

// vamos criar uma variavel no fortmato de array
// que ira guardar os produtos do arquivo loja
var dadosprodutos = null;

// realizar a leitura do arquivo de texto.
// primeira parte é o nome do arquivo
// segunda parte é o encoding(tipo texto-com acento)
// terceira parte é a funcao de callback
fs.readFile("./loja.json", "utf-8", function (err, texto) {
  if (err) throw err;
  dadosprodutos = JSON.parse(texto);
});

// vamos iniciar os exemplos de utilizacao de
// verbos http

var layout = [
  {
    header: "loja de produtos",
    navegacao: "listar,cadastrar,atualizar,deletar",
    main: "pagina do corpo",
    footer: "Av. João Paulo, Vila Nova - São Paulo -SP",
  },
];

// GET
// quando o meu usuario deseja obter alguns dados
// do servidor
app.get("/listar", (req, res) => {
  layout[0].main = dadosprodutos.produtos;
  res.send(layout);
});

// POST
// utilizar quando o meu usuario envia algo ao
// servidor com o intuito de cadastrar ou
// realizar autenticacao
app.use(bodyParser.json());
app.post("/cadastrar", (req, res) => {
  dadosprodutos.produtos.push(req.body);

  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("dados cadastrados");
  });
});

// PUT
app.put("/atualizar", (req, res) => {
  var idenviado = req.body.idproduto;

  // pegar a quantidade de produtos deentro do arquivo json
  var qtd = dadosprodutos.produtos.length;

  for (var i = 0; i < qtd; i++) {
    if (idenviado == dadosprodutos.produtos[i].idproduto) {
      dadosprodutos.produtos[i].nome = req.body.nome;
      dadosprodutos.produtos[i].descricao = req.body.descricao;
      dadosprodutos.produtos[i].preco = req.body.preco;
      dadosprodutos.produtos[i].imagem = req.body.imagem;
      break;
    }
  }

  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "UTF-8", function (
    err
  ) {
    if (err) throw err;
    res.send("dados atualizadoscom sucesso!");
  });
});
// utlizando quando o usuario deseja apagar algum dado
app.delete("/apagar", (req, res) => {
  var idenviado = req.body.idproduto;
  var qtd = dadosprodutos.produtos.length;
  for (var i = 0; i < qtd; i++) {
    if (idenviado == dadosprodutos.produtos[i].idproduto) {
      dadosprodutos.produtos.splice(i, 1);
      break;
    }
  }
  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("produto apagado.");
  });
});

app.listen(3000);
console.log("servidor online");
