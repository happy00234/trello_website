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
const deleteList = async (id) => {
  const result = await pool.query(
    "DELETE FROM lists WHERE id = $1 RETURNING *",
    [id]
  );
  return result;
};

const updateList = async (id, title) => {
  const result = await pool.query(
    "UPDATE lists SET title = $1 WHERE id = $2 RETURNING *",
    [title, id]
  );
  return result.rows[0];
};

module.exports = {
  createList,
  getListsByBoard,
  deleteList,
  updateList,
};