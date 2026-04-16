
const {
  createBoard,
  getBoards,
  deleteBoard,
  updateBoard,
} = require("../models/boardModel");

const createBoardHandler = async (req, res) => {
  try {
    const { title } = req.body;
    const board = await createBoard(title);
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating board");
  }
};

const getBoardsHandler = async (req, res) => {
  try {
    const boards = await getBoards();
    res.json(boards);
  } catch (err) {
    res.status(500).send("Error fetching boards");
  }
};

const deleteBoardHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteBoard(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).send("Error deleting board");
  }
};
const updateBoardHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { lists } = req.body;

    const updatedBoard = await updateBoard(id, lists);

    res.json(updatedBoard);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating board");
  }
};
module.exports = {
  createBoardHandler,
  getBoardsHandler,
  deleteBoardHandler,
  updateBoardHandler,
};