const express = require('express')
const router = express.Router()

const Task = require('../models/task')

/* GET ALL TASK */
router.get('/', (req, res, next) => {
  const query = req.query.active ? { 'active': req.query.active } : {};
  Task.find(query, (err, tasks) => {
    if (err) return next(err)
    res.json(tasks)
  })
})

/* SAVE TASK */
router.post('/', (req, res, next) => {
  Task.find({}, ['taskId'], { limit: 1, sort: { taskId: -1 } }, (err, maxId) => {
    if (!req.body.taskId) {
      if (maxId.length > 0 && maxId[0].taskId)
        req.body.taskId = parseInt(maxId[0].taskId) + 1
      else
        req.body.taskId = 1;
    }
    Task.create(req.body, (err, post) => {
      if (err) return next(err)
      res.json(post)
    })
  })
})

/* UPATE TASK */
router.put('/:id', (req, res, next) => {
  Task.findOneAndUpdate({ taskId: req.params.id },
    req.body, { upsert: true }, (err, task) => {
      if (err) return next(err)
      res.json(task)
    })
})

/* REMOVE TASK */
router.delete('/:id', (req, res, next) => {
  Task.remove({ task: req.params.id }, (err, task) => {
    if (err) return next(err)
    res.json(task)
  })
})

module.exports = router;  