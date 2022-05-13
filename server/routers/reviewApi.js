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
    res.redirect('/mypage');
  });

router.patch('/update',
 cookieController.getCookie,
 sessionController.verifySession,
 reviewController.createReview,
  (req, res) => {res.redirect('/home')});

router.get('/recentreview/media/:filter', reviewController.recentReviewFilterMedia, (req, res) => {
  return res.status(200).json(res.locals.reviews)
});

router.post('/delete',
  cookieController.getCookie,
  sessionController.verifySession,
  reviewController.deleteReview,
  (req, res) => {
    return res.status(200).json({message:"Review was removed"})
  })


router.get('/recentreview/user/:id', reviewController.recentReviewFilterUser, (req, res) => {
  // console.log(res.locals.reviews);
  return res.status(200).json(res.locals.reviews)
});

// router.get('/edit', cookieController.getCookie, sessionController.verifySession, reviewController.editableReview, (req, res) => {
//   res.status(200).json((res.locals.review));
// });

module.exports = router;