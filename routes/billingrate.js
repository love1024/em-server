const express = require('express')
const router = express.Router()

const BillingRate = require('../models/billing_rate')

/* GET ALL BILLING */
router.get('/', (req, res, next) => {
  BillingRate.find((err, billing) => {
    if (err) return next(err)
    res.json(billing)
  })
})

/* GET BILLING BY ID */
router.get('/:id', (req, res, next) => {
  BillingRate.find({ billingId: req.params.id }, (err, billing) => {
    if (err) return next(err)
    res.json(billing)
  })
})

/* SAVE BILLING */
router.post('/', (req, res, next) => {
  BillingRate.find({}, { 'billingId': 1, '_id': 0 }, { limit: 1, sort: { billingId: -1 } }, (err, maxId) => {
    if (!req.body.billingId) {
      if (maxId.length > 0 && maxId[0].billingId)
        req.body.billingId = parseInt(maxId[0].billingId) + 1
      else
        req.body.billingId = 1;
    }
    BillingRate.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE BILLING */
router.put('/:id', (req, res, next) => {
  BillingRate.findOneAndUpdate({ _id: req.params.id },
    req.body, { upsert: true }, (err, billing) => {
      if (err) return next(err)
      res.json(billing)
    })
})

/* REMOVE BILLING */
router.delete('/:id', (req, res, next) => {
  BillingRate.remove({ _id: req.params.id }, (err, billing) => {
    if (err) return next(err)
    res.json(billing)
  })
})

module.exports = router;  