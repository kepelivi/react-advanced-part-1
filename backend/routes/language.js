/*
 * /api/v1/language
 */
const express = require("express");
const mongoose = require("mongoose");
const LanguageModel = require("../db/language.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const languages = await LanguageModel.find();
    res.json(
      languages.map((lang) => {
        return { langid: lang.langid, name: lang.name };
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("DB error");
  }
});

router.get("/:langid", async (req, res) => {
  try {
    const langid = parseInt(req.params.langid);
    const language = await LanguageModel.find({ langid });
    if (language.length > 0) {
      res.json(language[0]); // langid should be unique
    } else {
      res.status(404).json({ msg: `There is no language with ID ${langid}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("DB error");
  }
});

router.post("/", async (req, res) => {
  try {
    const langid = req.body.langid;
    const language = await LanguageModel.find({ langid });
    if (language.length > 0) {
      res.status(400).json({ msg: `The ID ${langid} already exists` }); // langid should be unique
    } else {
      const saved = await LanguageModel.create(req.body);
      res.json(saved);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("DB error");
  }
});

module.exports = router;
