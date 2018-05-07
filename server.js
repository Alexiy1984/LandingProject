const path           = require('path'); 
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const sassMiddleware = require('express-sass-middleware')
const bodyParser     = require('body-parser');
const db_cred        = require('./config/db');
const app            = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

//app.use(express.static(path.join(__dirname, 'app/styles')));

app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db_cred.url, (err, database) => {
  if (err) return console.log(err)
  db = database.db("landingdb")
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})

app.get('/app/styles/main.css', sassMiddleware({
  file: './app/styles/src/test.scss', 
  watch: true,
  precompile: true, 
  outputStyle: 'compressed',
  includePaths: ['./my', './directories'],
  indentedSyntax: true,
}))
