var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const config = require('../config');
const Resource = require('../models/resource');

/* Check Login Credentials. */
router.post('/', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  let response;
  let query = { resourceId: username, password: password };
  Resource.find({ resourceId: username, password: password }, (err, resources) => {
    if (err) return next(err);
    console.log(resources);
    if (resources.length > 0) {
      const payload = {
        username: username
      }
      let token = jwt.sign(payload, config.secret, {
        expiresIn: config.tokenExpiesIn
      });
      response = { type: "ok", token: token, expiresIn: config.tokenExpiesIn, resourceId: username };
    } else
      response = { type: "fail" };
    res.json(response);
  })
});

module.exports = router;
