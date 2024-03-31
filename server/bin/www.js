const app = require('../api.js');
let server;
const port = 8080;

(async () => {
  server = app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
})();

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
  process.exit(0);
});

module.exports = server;