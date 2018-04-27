const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db_cred        = require('./config/db');
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db_cred.url, (err, database) => {
  if (err) return console.log(err)
  db = database.db("landing_project")
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
