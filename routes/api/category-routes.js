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

router.post('/', async (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Basketball",
    }
  */
  const categoryData = await Category.create({
    category_name: req.body.category_name,
  })
  .then((categoryData) => {
    res.json(categoryData);
  })
 .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
   /* req.body should look like this...
    {
      category_name: "Basketball",
    }
  */
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
      where: {
        id: req.params.id,
      }
      })
      .then((categoryData) => {
        res.json(categoryData);
      })
     .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });


});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.json({
      data: "success"
    })
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
  });
});

module.exports = router;
