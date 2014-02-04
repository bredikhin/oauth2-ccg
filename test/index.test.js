var assert = require('assert')
  , ccg = require('../index')
  , config = require('../config-example');

describe('Client credential grant', function() {
  //
  describe('Authentication server connection', function() {
    it ("should return error when unable to connect", function() {
      ccg(config, function(err) {
        assert(err, 'An error should occur while trying to connect to a wrong server!');
      });
    });
  }); 
});
