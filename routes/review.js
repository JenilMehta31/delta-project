const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");
const listingController = require("../controllers/review.js");

const validateReview = (req,res,next) => {
    let{error} = reviewSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

//Reviews Route
router.post("/", isLoggedIn,validateReview, wrapAsync(listingController.postReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(listingController.deleteReview))

module.exports = router;