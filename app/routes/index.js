const noteRoutes  = require('./note_routes');
const testRoutes  = require('./test_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  testRoutes(app, db);
};
