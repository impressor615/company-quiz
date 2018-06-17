const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const apiRouter = require('./api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use('/api', apiRouter);

    server.get('/', (req, res) => app.render(req, res, '/'));
    server.get('/quiz', (req, res) => app.render(req, res, '/quiz', req.query));
    server.get('/result', (req, res) => app.render(req, res, '/result'));
    server.get('/settings', (req, res) => app.render(req, res, '/settings'));
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
