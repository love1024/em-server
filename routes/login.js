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
  let query = { resourceId: username, password: password, active: true };
  Resource.find(query, (err, resources) => {
    if (err) return next(err);
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

/* Change password */
router.post('/:id', function (req, res, next) {
  const username = req.params.id;
  const password = req.body.password;

  let response;
  let query = { resourceId: username, active: true };
  Resource.findOneAndUpdate(query, { $set: { "password": password } }, { upsert: true }, (err, resource) => {
    if (err) return next(err)
    res.json(resource)
  })
});


module.exports = router;
