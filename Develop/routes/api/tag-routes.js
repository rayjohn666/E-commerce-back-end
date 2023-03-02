const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [Product],
  })
  .then((Tag) => res.json(Tag))
  .catch((error) => res.status(500).json(error))
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    // not sure about this on line 24 >>
    include: [Product],
  })
  .then((Tag) => res.json(Tag))
  .catch((error) => res.status(400).json(error))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((error) => res.status(400).json(error))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((Tag) => res.status(200).json(Tag))
  .catch((error) => res.status(400).json(error))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((error) => res.status(400).json(error))
});

module.exports = router;
