const express = require("express");
const burger = require("../models/burger");
const router = express.Router();

router.get('/', (req, res) => {
burger.all((data) => {
  const burgerOb = {
    burgers:data,
  };
  console.log(burgerOb);
    res.render('index', burgerOb)
});
});

router.post('/api/burgers', (req, res) => {
    burger.create(['burger_name', 'devoured'], [req.body.name, req.body.devoured], (result) => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    console.log('condition', condition);
  
    burger.update(
      {
        devoured: req.body.devoured,
      },
      condition,
      (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });

  router.delete('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    burger.delete(condition, (result) => {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    });
  });

  module.exports = router;