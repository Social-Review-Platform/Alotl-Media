const db = require('../models/model.js');

const reviewController = {};




reviewController.createReview = (req, res, next) => {
  // console.log(req.body.radio);
  // let rating = 0;
  // if (req.body.radio === 'radioYes'){
  //   rating = 1;
  // }

  // console.log('getting to createReview')
  const { user_id, review, rating} = req.body;
  const mediaId = res.locals.mediaId;
  // console.log('review and rating: ', review, rating, '\n')
  // console.log('res.locals: ', res.locals);

  console.log(user_id, mediaId, review, rating)
  const query =
    `INSERT INTO "public"."public.Review" ("user_id", "media_id", "review", "rating")
    VALUES ($1, $2, $3, $4)`;
  db.query(query, [user_id, mediaId, review, rating])
    .then(data => {
      // console.log('data.rows[0]: ', data.rows[0])
      // console.log('data.rows: ', data.rows)
      // res.locals.review = data.rows;
      // console.log('res.locals.review: ', res.locals.review)
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'error in mediaController.createReview',
        message: `server error ${err} `
      };
      return next(errorObj);
    })
}


reviewController.recentReviewFilterMedia = (req, res, next) => {
  console.log('filter is ', req.params.filter);
  const filter = req.params.filter;

  //filter can be
  // Book, Movie, Music
  // or a number (user_id)
  // Home

  // SELECT "public"."public.Review"._id, "public"."public.User".username, "public"."public.Review".review, "public"."public.Review".rating, "public"."public.Media".title, "public"."public.Media".type
  // FROM "public"."public.User"
  // INNER JOIN "public"."public.Review"
  // ON "public"."public.User"._id = "public"."public.Review".user_id
  // INNER JOIN "public"."public.Media"
  // ON "public"."public.Review".media_id = "public"."public.Media"._id
  // WHERE "public"."public.Media".type = 'Book'


  let query = `SELECT "public"."public.User".username, "public"."public.Review".review, "public"."public.Review".rating, "public"."public.Review"._id, "public"."public.Media".title, "public"."public.Media".type
  FROM "public"."public.User"
  INNER JOIN "public"."public.Review"
  ON "public"."public.User"._id = "public"."public.Review".user_id
  INNER JOIN "public"."public.Media"
  ON "public"."public.Review".media_id = "public"."public.Media"._id
  WHERE "public"."public.Media".type = $1 
  ORDER BY "public"."public.Review"._id DESC LIMIT 19`;

  // console.log(query);
  // [$1]
  db.query(query, [filter])
  .then( data => {
    // console.log(data.rows);
    res.locals.reviews = data.rows;
    return next();
  });
}

reviewController.recentReviewFilterUser = (req, res, next) => { 
  
  console.log('filter is ', req.params.id);
  const filter = req.params.id;

  let query = `SELECT "public"."public.User".username, "public"."public.Review".review, "public"."public.Review".rating, "public"."public.Review"._id, "public"."public.Media".title, "public"."public.Media".type
  FROM "public"."public.User"
  INNER JOIN "public"."public.Review"
  ON "public"."public.User"._id = "public"."public.Review".user_id
  INNER JOIN "public"."public.Media"
  ON "public"."public.Review".media_id = "public"."public.Media"._id`



  if(filter === "Home"){
    query += ` ORDER BY "public"."public.Review"._id DESC LIMIT 19`;

    db.query(query)
    .then(data => {
      res.locals.reviews = data.rows
      return next()
    })
  } else {
    query += ` WHERE "public"."public.User"._id = $1 ORDER BY "public"."public.Review"._id DESC LIMIT 19`;

    db.query(query, [filter])
    .then(data => {
      res.locals.reviews = data.rows
      return next()
    })
  }    

  
}
reviewController.deleteReview = (req,res,next) => {
  let userID = res.locals.user_id;
  let reviewID = req.body.id;
  console.log(userID, reviewID)
  const query = `DELETE FROM "public"."public.Review"
  WHERE user_id = $1 AND _id = $2`

  db.query(query,[userID,reviewID ])
  .then(data => {
    return next()
  })
  .catch(err => {
    const errorObj = {
      log: 'error in mediaController.deleteReview',
      message: `server error ${err} `
    };
    return next(errorObj);
  })
}

// add reviewController.updateReview to reviewApi router

// reviewController.updateReview = (req, res, next) => {
//   // Deconstruct the req.body
//   const { user_id, review, rating } = req.body;
//   const mediaId = res.locals.mediaId;
//   // Check if the user's id matches the res.locals.mediaId
//   // Look through the reviews to update the review and rating with the body's review and rating.
//   // Update the review based on the review_id that matches the body's user_id's review_id.
//   const query = `UPDATE "public"."public.Review"
//   SET "public"."public.Review".review = $3, "public"."public.Review".rating = $4
//   WHERE "public"."public.Review".user_id = $1 AND "public"."public.Review".media_id = $2`

//   db.query(query, [user_id, mediaId, review, rating])
//     .then(data => {
//       // Do we need to compare the reviewID to the mediaID?
//       res.locals.reviews = data.rows;
//       return next();
//     }).catch(err => {
//       const errorObj = {
//         log: 'error in reviewController.updateReview',
//         message: `server error ${err} `
//       }
//       return next(errorObj);
//     })

//     reviewController.editableReview = (req, res, next) => {
//       const { review_id } = req.body;
//       const query = `SELECT "public"."public.Review".media_id, "public"."public.Review".user_id, "public"."public.Review"._id, "public"."public.Review".review,  "public"."public.Media".title, "public"."public.Media".type, "public"."public.Media"._id
//       FROM "public"."public.Review"
//       RIGHT OUTER JOIN "public"."public.Media"
//       ON "public"."public.Review".media_id = "public"."public.Media"._id
//       WHERE "public"."public.Review".user_id = res.locals.user_id AND "public"."public.Review"._id = review_id`;
//      db.query(query)
//         .then(data => {
//           res.locals.reviews = data.rows[0]
//           return next()
//         })
// }

module.exports = reviewController;

