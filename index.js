/* index.js */

const express = require('express'); // Appel de la dépendance
const app = express();               // Initialisation de l'application
const port = 1234;              // Choix du port
const mysql = require('mysql');
const DBManager = require('./db-manager');
const dbManager = new DBManager();

//Loads the handlebars module
const handlebars = require('express-handlebars');//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');//Sets handlebars configurations (we will go through them later on)

app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'planB',

  //new configuration parameter
  partialsDir: __dirname + '/views/partials/'
}))
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'majorette'

});
db.connect(function (err) {
  if (err) throw err;
  console.log("tu es bien connectée à la base de donnée!");

});
app.get('/', function (req, res) {
  let query = "SELECT * FROM products";
  const search = req.query.search;
if (search){
  query+=" where productName like '%"+search+"%'"
};
  db.query(query, function (err, result) {
    if (err) { throw err };

    res.render('main', {
      layout:'index',
      products: result,
      search: search
    });
  });
});

// fakeApi = () => {
//   return [
//     {
//       name: 'Katarina',
//       lane: 'midlaner'
//     },
//     {
//       name: 'Jayce',
//       lane: 'toplaner'
//     },
//     {
//       name: 'Heimerdinger',
//       lane: 'toplaner'
//     },
//     {
//       name: 'Zed',
//       lane: 'midlaner'
//     },
//     {
//       name: 'Azir',
//       lane: 'midlaner'
//     }
//   ];
// }
// app.get('/', (req, res) => {
//   res.render('main', { layout: 'index', suggestedChamps: fakeApi(), listExists: true });
// });

//Serves static files (we need it to import a css file)
app.use(express.static('public'))


app.listen(port, () => console.log(`App listening to port ${port}`));



// app.get('/', (request, response) => {
//     response.send('Hello World!')
// })

// app.get('/user/:id', (request, response) => {
//     response.send(`user #${request.params.id}`)
// })

// app.listen(port, () => {
//     console.log(`Express running on port ${port}`)
// })
