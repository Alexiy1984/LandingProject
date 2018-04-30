const noteRoutes  = require('./note_routes');
const testRoutes  = require('./test_routes');
const userRoutes  = require('./user_routes');
const rootRoute   = require('./root');
module.exports = function(app, db, res) {
  noteRoutes(app, db);
  testRoutes(app, db);
  userRoutes(app, db);
  rootRoute (app, res);
};


