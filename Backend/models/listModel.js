const pool = require("../db");

const createList = async (title, board_id) => {
  const result = await pool.query(
    "INSERT INTO lists (title, board_id) VALUES ($1, $2) RETURNING *",
    [title, board_id]
  );
  return result.rows[0];
};

const getListsByBoard = async (boardId) => {
  const result = await pool.query(
    "SELECT * FROM lists WHERE board_id = $1 ORDER BY id",
    [boardId]
  );
  return result.rows;
};

module.exports = {
  createList,
  getListsByBoard,
};