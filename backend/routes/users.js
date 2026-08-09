const User = require("../models/user");
const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");
const {
  validateUpdateProfile,
  validateAvatar,
  validateUserId,
} = require("../middlewares/validation");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateProfile, updateProfile);
router.patch("/me/avatar", validateAvatar, updateAvatar);
router.get("/:userId", validateUserId, getUserById);

module.exports = router;
