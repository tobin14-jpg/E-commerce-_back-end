const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  const tags = await Tag.findAll({
    include: [
      {model: Product, as: "product_id"},
    ],
  })
  .then((tags) => {
    res.json(tags);
  })
  .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try {
  const tag = await Tag.findByPk(req.params.id, {
    include: [
      {model: Product, as: "product_id"},
    ],
  });  
  if (!tag) {
    res.status(404).json({ message: 'No item found with that id!' });
    return;
  }
  res.json(tag);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
   /* req.body should look like this...
    {
      tag_name: "Basketball",
    }
  */
    const tag = await Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((tag) => {
    res.json(tag);
  })
 .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this...
    {
      tag_name: "Basketball",
    }
  */
  const tag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
    where: {
      id: req.params.id,
    }
    })
    .then((tag) => {
      res.json(tag);
    })
   .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  const tag = await Tag.destroy({
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
