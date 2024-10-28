const express = require('express');
const router = express.Router();

const Lyrics = require('../models/lyrics');

router.get('/', async (req, res) => {
  try {
    const populatedLyrics = await Lyrics.find({}).populate('owner');
    res.render('lyrics/index.ejs', { lyrics: populatedLyrics });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
  
router.get('/new', async (req, res) => {
    res.render('lyrics/new.ejs');
  });

router.get('/:id', async (req, res) => {
    try {
      const foundLyrics = await Lyrics.findById(req.params.id).populate('owner');
      res.render('lyrics/show.ejs', { lyric: foundLyrics });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:id/edit', async (req, res) => {
    try {
      const foundLyrics = await Lyrics.findById(req.params.id);
      if (foundLyrics.owner.equals(req.session.user._id)) {
        res.render('lyrics/edit.ejs', { lyric: foundLyrics });
      }else{
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

router.post('/', async(req, res) => {
    req.body.owner = req.session.user._id;
    await Lyrics.create(req.body);
    res.redirect('/lyrics');
});

router.put('/:id', async (req, res) => {
  try {
    const currentLyric = await Lyrics.findById(req.params.id);
    if (currentLyric.owner.equals(req.session.user._id)) {
      await currentLyric.updateOne(req.body);
      res.redirect(`/lyrics/${currentLyric._id}`);
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete("/:Id", async (req, res) => {
  try {
    const currentLyric = await Lyrics.findById(req.params.Id);
    console.log(currentLyric);
    if (currentLyric.owner.equals(req.session.user._id)) {
      await Lyrics.findByIdAndDelete(req.params.Id);
      res.redirect('/lyrics');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;