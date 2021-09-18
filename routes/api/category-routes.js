const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get route for all Categories & Products  
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get route for a particular ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
    },
  });
  
  if (!categoryData) {
    res.status(404).json({ message: 'No category found with that ID!' });
    return;
  }
  res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
});

if (!categoryData) {
  res.status(404).json({ message: 'No category found with that ID!' });
  return;
}

res.status(200).json(categoryData);
} catch (err) {
res.status(500).json(err);
}
});


module.exports = router;
