const express = require('express');
const app = express();
const session = require('express-session');
const connection = require('./database/connection');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const { Router } = require('express');
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

//VIEW ENGINE
app.set('view engine', 'ejs');

//SESSIONS

//REDIS

app.use(
  session({
    secret: 'senhaahnes',
    cookie: { maxAge: 30000 },
  }),
);

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
app.use('/', usersController);

app.get('/session', (req, res) => {});

app.get('/leitura', (req, res) => {});

app.use(express.static('public'));

app.get('/', (req, res) => {
  Article.findAll({
    order: [['id', 'DESC']],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render('index', { articles: articles, categories: categories });
    });
  });
});

app.get('/:slug', (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render('article', { article: article, categories: categories });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render('index', {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.redirect('/');
    });
});

app.listen(8080, () => {
  console.log('The server is running!');
});
