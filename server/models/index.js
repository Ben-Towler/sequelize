const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = {
  "define": {
    timestamps: true
  }, 
  host: 'localhost',
  dialect: 'postgres'
}

const sequelize = new Sequelize('chat_app', 'dev', 'password', config);

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  }); 

Object.keys(db).forEach(model => {
  if (db[model].associate) db[model].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;