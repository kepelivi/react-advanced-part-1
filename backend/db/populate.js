const mongoose = require('mongoose');
const fs = require('fs/promises');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});
const LanguageModel = require('./language.model');
const FeedbackModel = require('./feedback.model');

// set by dotenv, above
const { MONGO_URL } = process.env;

async function populateLanguages() {
  const languageFilePath = path.join(
    __dirname, 'programming_languages.json'
  );
  const languages = JSON.parse(await fs.readFile(languageFilePath));
  await LanguageModel.deleteMany({});
  await LanguageModel.create(languages);
  console.log(`${languages.length} documents were created`);
}

async function populateFeedback() {
  const feedbackFilePath = path.join(
    __dirname, 'feedback.json'
  );
  const feedbacks = JSON.parse(await fs.readFile(feedbackFilePath));
  await FeedbackModel.deleteMany({});
  await FeedbackModel.create(feedbacks);
  console.log(`Added ${feedbacks.length} feedback(s)`);
}

async function main() {
  await mongoose.connect(MONGO_URL);
  await populateLanguages();
  await populateFeedback();
  mongoose.disconnect();
}

main()
