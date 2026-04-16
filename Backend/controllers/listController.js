const {
  createList,
  getListsByBoard,
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

module.exports = {
  createListHandler,
  getListsHandler,
};