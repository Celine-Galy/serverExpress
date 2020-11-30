/* index.js */

const express = require('express'); // Appel de la dépendance
const app = express();               // Initialisation de l'application
const port = 1234;              // Choix du port
const DBManager = require('./db-manager');
const db = new DBManager();


//Loads the handlebars module
const handlebars = require('express-handlebars');//Sets our app to use the handlebars engine
const { response } = require('express');
app.set('view engine', 'hbs');//Sets handlebars configurations (we will go through them later on)

app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'planB',

  //new configuration parameter
  partialsDir: __dirname + '/views/partials/'
}))
//Serves static files (we need it to import a css file)
app.use(express.static('public'))

app.get('/', function (req, res) {
  let query = "SELECT * FROM products";
  db.getDB().query(query, function (err, result) {
    if (err) { throw err };
    res.render('main', {
      layout: 'index',
      products: result,
    });

  });
});
app.get('/search', (req, res) => {

  let query = "SELECT * FROM products";
  const search = req.query.search;
  console.log('search -' + search);

  if (search) {
    query += ' WHERE productName like "%' + search + '%"';
  }
  db.getDB().query(query, (err, products) => {
    if (err) { throw err; }

    res.send(products);
  });

})
app.listen(port, () => console.log(`App listening to port ${port}`));

