const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  const categories = await Category.findAll({
    include: [
      {model: Product},
    ],
  })
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [
        {model: Product},
      ],
    });  
    if (!categories) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
