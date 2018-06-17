const { result } = require('../models');

module.exports = (router) => {
  router.get('/results', (req, res) => (
    result
      .find({}, 'name department position result')
      .sort('-result.correct_percent')
      .limit(5)
      .exec()
      .then(data => res.json(data))
  ));

  router.post('/results', (req, res) => {
    const {
      name, department, position, data,
    } = req.body;
    return result.create({
      name, department, position, result: data,
    }).then(() => res.json({}), err => res.json({ err }));
  });
};
