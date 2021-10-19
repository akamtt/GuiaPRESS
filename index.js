const express = require('express');
const app = express();
const connection = require('./database/connection');

//VIEW ENGINE
app.set('view engine', 'ejs');

//DATABASE

connection
  .authenticate()
  .then(() => {
    console.log('Database has connected successfully!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.listen(8080, () => {
  console.log('O servidor está rodando!');
});
