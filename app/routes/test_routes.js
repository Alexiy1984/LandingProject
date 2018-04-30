module.exports = function(app, db) {
  app.post('/tests', (req, res) => {
    const test = { text: req.body.body, title: req.body.title };
    db.collection('tests').insert(test, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
        console.log(result.ops[0]);
      }
    });
  });
};
