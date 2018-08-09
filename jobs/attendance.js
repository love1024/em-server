const Excel = require('exceljs')
const express = require('express')
const router = express.Router()


router.post('/', (req, res, next) => {
  console.log(req.files);
  res.send({ res: "success" })
})


module.exports = router; 
