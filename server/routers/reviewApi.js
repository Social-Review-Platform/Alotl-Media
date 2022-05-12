const express = require('express');
const path = require('path');

const cookieController = require('../controllers/cookieController');
const mediaController = require('../controllers/mediaController')
const sessionController = require('../controllers/sessionController')
const reviewController = require('../controllers/reviewController')

const router = express.Router();
// original route maybe of use later 
// router.post('/', mediaController.findMedia, mediaController.createMedia, mediaController.findUser, mediaController.createReview, (req, res) => {
//   return res.status(200).json(res.locals.review)
// })
// HOPE THIS WORKS
// IT WORKED - FROM FUTURE
// create router for create review (/api/review/createreview)
router.post('/createreview', 
  cookieController.getCookie, 
  sessionController.verifySession, 
  mediaController.getMediaIdByTitle,
  mediaController.createMedia,
  reviewController.createReview,
  (req, res) => {
    // redirect to what route?
<<<<<<< HEAD
    res.redirect('/mypage');
  });

// router.post('/createreview',  (req, res) => {
//   console.log('hhihi', req.body);
//   res.redirect('/home')
// });
=======
    res.redirect('/home')
  }
);
>>>>>>> 594d78a94aac18525693fe86cc9eefa6498e723c

// router.post('/', mediaController.findMedia, mediaController.createMedia, mediaController.findUser, mediaController.createReview, (req, res) => {
//   return res.status(200).json(res.locals.review)
// });

router.get('/recentreview', reviewController.recentReview, (req, res) => {
  // console.log(res.locals.reviews);
  return res.status(200).json(res.locals.reviews)
});


// router.get('/api/review/recentBooksReview', reviewController.recentBookReview, (req, res) => {
//   return res.status(200).json(res.locals.reviews)
// });


// router.get('/api/review/recentMoviesReview', reviewController.recentMovieReview, (req, res) => {
//   return res.status(200).json(res.locals.reviews)
// });


// router.get('/api/review/recentMusicReview', reviewController.recentMusicReview, (req, res) => {
//   return res.status(200).json(res.locals.reviews)
// });


// router.get('/api/review/:id', reviewController.recentMusicReview, (req, res) => {
//   return res.status(200).json(res.locals.reviews)
// });






module.exports = router;