const express = require('express');
const app = express();
const connection = require('./database/connection');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const { Router } = require('express');
const Article = require('./articles/Article');
const Category = require('./categories/Category');

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

app.use('/', categoriesController);
app.use('/', articlesController);

app.use(express.static('public'));

app.get('/', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('index', { articles: articles });
  });
});

app.listen(8080, () => {
  console.log('The server is running!');
});
