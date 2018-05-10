var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  
  function CorrectInputCheck(login, password, email, group) {
    if (login && password && email && group) {
      return true;
    } else {
      var inerr = '';
      var errtext = 'incorrect';
      if (!login) {
        inerr = inerr + ' ' + errtext + ' login,'
      }
      if (!password) {
        inerr = inerr + ' ' + errtext + ' password,';
      } 
      if (!email) {
        inerr = inerr + ' ' + errtext + ' email,';
      } 
      if (!group) {
        inerr = inerr + ' ' + errtext + ' group,';
      } 
      return({'error': inerr.substring(1,inerr.length-1)});
    }
  }

  app.post('/users', (req, res) => {
    const user = {login: req.body.login, password: req.body.password, email: req.body.email, group: req.body.groups};
    if (CorrectInputCheck(req.body.login,req.body.password,req.body.email,req.body.groups) == true) {
      db.collection('users').insert(user, (err, result) => {
        if (err) {
          console.log(err);
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);  
        }
      });
    } else res.send(CorrectInputCheck(req.body.login,req.body.password,req.body.email,req.body.groups));
  }); 

  // app.get('/users/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   db.collection('users').findOne(details, (err, item) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       //res.send(item);
  //       res.render('default', {
  //         title : 'Landing test index',
  //         headerclass       : 'header'  ,
  //         contentclass      : 'content' ,
  //         contentinnerclass : 'content__inner',
  //         footerclass       : 'footer',
  //         login             : item.login
  //       });
  //     } 
  //   });
  // });

  app.get('/users/:login', (req, res) => {
    const login = req.params.login;
    const flogin = {"login": login};
    db.collection('users').findOne(flogin, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.render('default', {
          title : 'Landing test index',
          headerclass       : 'header'  ,
          contentclass      : 'content' ,
          contentinnerclass : 'content__inner',
          footerclass       : 'footer',
          login             : item.login,
          email             : item.email,
          id                : item._id,
          readonly          : true
        });
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
    if (CorrectInputCheck(req.body.login,req.body.password,req.body.email,req.body.groups) == true) {
      db.collection('users').update(details, user, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(user);
            console.log(req.body.login);
          } 
      });
    } else res.send(CorrectInputCheck(req.body.login,req.body.password,req.body.email,req.body.groups));
  });
};

