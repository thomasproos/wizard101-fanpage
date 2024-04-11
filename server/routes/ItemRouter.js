const express = require('express');
const Model = require('../database/database.js');
const router = express.Router();

router.get('/random-items/:quantity/:item', async (req, res) => {
  if (req.session.username) {
    const item = req.params.item;
    let quantity = req.params.quantity;
    const itemsList = ['hat', 'robe', 'boots', 'wand', 'ring', 'deck', 'athame', 'amulet'];
  
    // Validate item field
    if (typeof item !== 'string') {
      res.status(400).json({
        status: 400,
        message: 'Item parameter must be a proper string.'
      });
      return;
    }
  
    // Sanitize the actual content
    if (!item.match('^[a-z]{1,6}$')) {
      res.status(400).json({
        status: 400,
        message: 'Item parameter must be a proper string.'
      });
      return;
    }
  
    // Match one of the 8 items
    if (!itemsList.includes(item)) {
      res.status(400).json({
        status: 400,
        message: 'Item parameter must be a proper string.'
      });
      return;
    }
  
    // Validate quantity field
    if (isNaN(quantity)) {
      res.status(400).json({
        status: 400,
        message: 'Quantity parameter must be an integer between 1 and 56.'
      });
      return;
    } else {
      quantity = parseInt(quantity);
      if (!isFinite(quantity) || Math.round(quantity) !== quantity) {
        res.status(400).json({
          status: 400,
          message: 'Quantity parameter must be an integer between 1 and 56.'
        });
        return;
      }
    }
  
    // Sanitize the quantity scope
    if (quantity < 0 || quantity > 56) {
      res.status(400).json({
        status: 400,
        message: 'Quantity parameter must be an integer between 1 and 56.'
      });
      return;
    }
  
    // Fetch the {quantity} of items from the {item} collection
    try {
      let items = [];
      switch (item) {
      case 'hat':
        await (async () => {
          items = await Model.HatModel.find({});
        })();
        break;
      case 'robe':
        await (async () => {
          items = await Model.RobeModel.find({});
        })();
        break;
      case 'boots':
        await (async () => {
          items = await Model.BootsModel.find({});
        })();
        break;
      case 'wand':
        await (async () => {
          items = await Model.WandModel.find({});
        })();
        break;
      case 'deck':
        await (async () => {
          items = await Model.DeckModel.find({});
        })();
        break;
      case 'ring':
        await (async () => {
          items = await Model.RingModel.find({});
        })();
        break;
      case 'athame':
        await (async () => {
          items = await Model.AthameModel.find({});
        })();
        break;
      case 'amulet':
        await (async () => {
          items = await Model.AmuletModel.find({});
        })();
        break;
      default:
        res.status(500).json({
          status: 500,
          message: 'Server failed to query item results.'
        });
        return;
      }
      res.status(200).json({
        status: 200,
        items: items
      });
    } catch(error) {
      res.status(500).json({
        status: 500,
        message: 'Server failed to query item results.'
      });
      return;
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized access to this resource.'
    });
  }
});

module.exports = router;