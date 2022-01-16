const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const userModel = require("../users/users-model");
const postModel = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const retrivedUsers = await userModel.get();

  res.json(retrivedUsers);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const validatedUser = await userModel.insert({ name: req.body.name });
  res.status(200).json(validatedUser);
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const validatedUser = await userModel.update(req.params.id, {
      name: req.body.name,
    });
    res.status(200).json(validatedUser);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const deletedUser = await userModel.remove(req.params.id);

    res.json(deletedUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const userPosts = await userModel.getUserPosts(req.params.id);
    res.json(userPosts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  try {
    const validatedText = await postModel.insert({
      user_id: req.params.id,
      text: req.body.text,
    });

    res.status(200).json(validatedText);
  } catch (err) {
    console.log(err);
  }
});

// do not forget to export the router

module.exports = router;
