const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
// eslint-disable-next-line
const fetch = require('isomorphic-fetch');

// eslint-disable-next-line
const { result, setting } = require('./models');


const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.get('/', (req, res) => app.render(req, res, '/'));
    server.get('/quiz', (req, res) => app.render(req, res, '/quiz', req.query));
    server.get('/result', (req, res) => app.render(req, res, '/result'));
    server.get('/settings', (req, res) => app.render(req, res, '/settings'));

    // api handler
    server.get('/api/settings', (req, res) => (
      setting
        .findOne({}, 'question_counts options_count')
        .sort('-created_at')
        .exec()
        .then(data => res.json(data))
    ));
    server.post('/api/settings', (req, res) => {
      const { count, options_count } = req.body;
      return setting.create({
        question_counts: count,
        options_count,
      }).then(() => res.json({}), err => res.json({ err }));
    });
    server.get('/api/result', (req, res) => (
      result
        .find({}, 'name department position result')
        .sort('-result.correct_percent')
        .limit(8)
        .exec()
        .then(data => res.json(data))
    ));
    server.post('/api/result', (req, res) => {
      const {
        name, department, position, data,
      } = req.body;
      return result.create({
        name, department, position, result: data,
      }).then(() => res.json({}), err => res.json({ err }));
    });
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
