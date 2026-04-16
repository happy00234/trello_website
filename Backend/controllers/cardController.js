const {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  updateCardMembers,
  moveCard,
} = require("../models/cardModel");

const createCardHandler = async (req, res) => {
  try {
    const { title, list_id } = req.body;
    const card = await createCard(title, list_id);
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating card");
  }
};
const updateMembersHandler = async (req, res) => {
  try {
    const { card_id, member_id } = req.body;

    const result = await updateCardMembers(card_id, member_id);

    res.json(result);
  } catch (err) {
    res.status(500).send("Error updating members");
  }
};

const getCardsHandler = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await getCardsByList(listId);
    res.json(cards);
  } catch (err) {
    res.status(500).send("Error fetching cards");
  }
};

const deleteCardHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteCard(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting card");
  }
};

const updateCardHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, label } = req.body;

    const result = await updateCard(id, req.body);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating card");
  }
};
const moveCardHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { list_id } = req.body;

    const card = await moveCard(id, list_id);
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error moving card");
  }
};

module.exports = {
  createCardHandler,
  getCardsHandler,
  updateCardHandler,
  deleteCardHandler,
  updateMembersHandler,
  moveCardHandler,
};