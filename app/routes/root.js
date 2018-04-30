module.exports = function(app, res) {
  app.get('/', (req, res) => {
    const path = require('path');
    res.render('default', {
      title : 'Landing test index'
    });
  });
};
