module.exports = function(app, db) {
  app.post('/test', (req, res) => {
    console.log(req.body);
    res.send('Hello, this is test response for another route')
  });
};
