const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article); //Uma categoria pertence a vários artigos (1 para muitos)
Article.belongsTo(Category); //Um artigo pertence a uma categoria. (1 para 1)

module.exports = Article;
