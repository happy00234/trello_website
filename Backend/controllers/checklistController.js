const {
  addItem,
  getItems,
  toggleItem,
} = require("../models/checklistModel");

const addItemHandler = async (req, res) => {
  try {
    const { card_id, text } = req.body;
    const item = await addItem(card_id, text);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding checklist item");
  }
};

const getItemsHandler = async (req, res) => {
  try {
    const { cardId } = req.params;
    const items = await getItems(cardId);
    res.json(items);
  } catch (err) {
    res.status(500).send("Error fetching checklist");
  }
};

const toggleItemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await toggleItem(id);
    res.json(item);
  } catch (err) {
    res.status(500).send("Error updating checklist");
  }
};

module.exports = {
  addItemHandler,
  getItemsHandler,
  toggleItemHandler,
};