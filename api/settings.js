const { setting } = require('../models');

module.exports = (router) => {
  router.get('/settings', (req, res) => (
    setting
      .findOne({}, 'question_counts options_count')
      .sort('-created_at')
      .exec()
      .then(data => res.json(data))
  ));

  router.post('/settings', (req, res) => {
    const { count, options_count } = req.body;
    return setting.create({
      question_counts: count,
      options_count,
    }).then(() => res.json({}), err => res.json({ err }));
  });
};
