const {
  createList,
  getListsByBoard,
  deleteList,
  updateList,
} = require("../models/listModel");

const createListHandler = async (req, res) => {
  try {
    const { title, board_id } = req.body;

    const list = await createList(title, board_id);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating list");
  }
};

const getListsHandler = async (req, res) => {
  try {
    const { boardId } = req.params;

    const lists = await getListsByBoard(boardId);
    res.json(lists);
  } catch (err) {
    res.status(500).send("Error fetching lists");
  }
};
const deleteListHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteList(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json({ message: "List deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting list");
  }
};

const updateListHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updated = await updateList(id, title);

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating list");
  }
};

module.exports = {
  createListHandler,
  getListsHandler,
  deleteListHandler,
  updateListHandler,
};