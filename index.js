// carregar o modulo express
// quando carregar o modulo faça associado a uma
// constante para evitar a alteração do conteudo
// e assim evitar erros de execucao .

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
app.post("/dados", (req, res) => {
  res.send("voce esta no verbo POST");
});

// PUT
// utlizando quando o usuario deseja apagar algum dado
app.delete("/dados", (req.res) => {
  res.send("voce esta no verbo DELETE");
});

app.listen(3000);
console.log("servidor online");
