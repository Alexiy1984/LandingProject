var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  
  app.post('/users', (req, res) => {
    const user = {login: req.body.login, password: req.body.password, email: req.body.email, group: req.body.groups};
    db.collection('users').insert(user, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ 'error': 'An error has occurred' });
      } else {
        if (req.body.login) {
          res.send(result.ops[0]);
        } else res.send({'error':'no correct login'});
      }
    });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const login = req.body.login;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('User ' + id + ' ' + login + ' deleted!');
      } 
    });
  });

  app.put ('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = {login: req.body.login, password: req.body.password, email: req.body.email, group: req.body.groups};
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(user);
          console.log(req.body.login);
        } 
    });
  });
};

