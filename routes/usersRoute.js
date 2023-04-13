const router = require("express").Router();
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl } = require("../controllers/usersController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");


// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router.route("/profile/:id")
    .get(validateObjectId, getUserProfileCtrl)
    .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl);



// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;