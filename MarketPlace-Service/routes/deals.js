var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let jsonresponse = {
    "handsetCards": [
      { title: 'Card 1', cols: 2, rows: 1 },
      { title: 'Card 2', cols: 2, rows: 1 },
      { title: 'Card 3', cols: 2, rows: 1 },
      { title: 'Card 4', cols: 2, rows: 1 }
    ],
    "webCards" : [
      { title: 'Card 1', cols: 2, rows: 1 },
      { title: 'Card 2', cols: 1, rows: 1 },
      { title: 'Card 3', cols: 1, rows: 2 },
      { title: 'Card 4', cols: 1, rows: 1 }
    ]
  };
  res.json(jsonresponse);
});

module.exports = router;
