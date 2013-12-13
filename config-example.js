/**
 * An example of configuration
 */
exports = module.exports = {
  clientCredentialsGrantEndpoint: {
    host: 'localhost',
    port: 3535,
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  clientId: 'a_client',
  clientSecret: 'kindasecret',
  scope: 'scope1 scope2'
}
