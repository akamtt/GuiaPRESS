const express = require('express');
const app = express();

//VIEW ENGINE
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Bem vindo ao meu site');
});
app.listen(8080, () => {
  console.log('O servidor está rodando!');
});
