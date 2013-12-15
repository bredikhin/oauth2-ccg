/**
 * Module dependencies
 */
var http = require('http')
  , querystring = require('querystring')
  , _ = require('underscore');

/**
 * Client Credentials Grant (http://tools.ietf.org/html/rfc6749#section-4.4)
 *
 * @param {Object} config
 * @param {Function} done
 */
module.exports.clientCredentialsGrant = function(config, done) {
  var postBody = querystring.stringify({
    grant_type: 'client_credentials', // Fixed according to the OAuth 2.0 specs
    scope: config['scope']
  });

  var postOptions = config['clientCredentialsGrantEndpoint'];
  // Using OAuth 2.0 client_id and client_secret as basic auth credentials
  postOptions['auth'] = config['clientId'] + ':' + config['clientSecret'];

  var req = http.request(postOptions, function(res) {
    // Response body
    var data = '';

    res.on('error', function(err) {
      done(err);
    });

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      var jsonData = JSON.parse(data)
        , err;

      if ((res.statusCode !== 200)||(!jsonData.scope)) {
        err = new Error('Authentication failed: ' + data);
        err.code = 'unauthorized';
      }
      else {
        var scope = _.intersection(config['scope'].split(' '), jsonData.scope.split(' '));
        var authorized = (scope.length > 0);
        if (authorized)
        {
          done(null, jsonData);
        }
        else {
          err = new Error("Authentication failed: scopes don't match");
          err.code = 'invalid_scope';
        }
      }

      if (err)
        done(err);
    });
  }).on('error', function(err) {
    done(err);
  });

  req.write(postBody);
  req.end();
}
