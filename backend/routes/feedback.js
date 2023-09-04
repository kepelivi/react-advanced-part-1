/*
 * /api/v2/feedback
 */
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const FeedbackModel = require("../db/feedback.model");

router.get("/", async (req, res) => {
  try {
    const allFeedbacks = await FeedbackModel.find();
    res.json(allFeedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).send("DB error");
  }
});

router.get("/summary/:langid", async (req, res) => {
  try {
    const langid = parseInt(req.params.langid);
    const languageFeedback = await FeedbackModel.find({ langid }).lean();
    console.log({ langid }, languageFeedback);
    const upvotes = languageFeedback.filter((fb) => fb.vote === 1).length;
    const downvotes = languageFeedback.filter((fb) => fb.vote === -1).length;
    res.json({ upvotes, downvotes });
  } catch (error) {
    console.log(error);
    res.status(500).send("DB error");
  }
});

router.post("/vote/:langid", async (req, res) => {
  try {
    const vote = req.body.vote;
    const langid = parseInt(req.params.langid);
    await FeedbackModel.create({ langid, vote });
    res.json({
      msg: `Vote ${vote} was added to language with ID ${langid}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("DB error");
  }
});

module.exports = router;
