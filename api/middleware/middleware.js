const userModel = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `Request Method: ${req.method}\nRequest URL: ${req.url}\nTime: ${Date()}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const possibleUser = await userModel.getById(req.params.id);

    if (!possibleUser) {
      next({ status: 404, message: "user not found" });
    } else {
      req.user = possibleUser;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    if (!req.body.name) {
      next({ status: 400, message: "missing required name field" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try {
    if (!req.body.text) {
      next({ status: 400, message: "missing required text field" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
