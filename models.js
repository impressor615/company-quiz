const mongoose = require('mongoose');
const Promise = require('bluebird');


const { Schema } = mongoose;
const dbURI = 'mongodb://localhost/tpay-quiz';
mongoose.connect(dbURI);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Mongoose default connection error: ${err}`);
});

const settingSchema = new Schema({
  question_counts: {
    type: Number,
    required: true,
  },
  options_count: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
const scoreSchema = new Schema({
  question_count: {
    type: Number,
    required: true,
  },
  correct_count: {
    type: Number,
    required: true,
  },
  incorrect_count: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
const resultSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  result: {
    type: scoreSchema,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = {
  result: mongoose.model('Result', resultSchema),
  setting: mongoose.model('Setting', settingSchema),
};
