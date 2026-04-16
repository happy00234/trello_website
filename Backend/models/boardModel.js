const pool = require("../db");

const createBoard = async (title) => {
  const result = await pool.query(
    "INSERT INTO boards (title) VALUES ($1) RETURNING *",
    [title]
  );
  return result.rows[0];
};

const getBoards = async () => {
  const result = await pool.query(
    "SELECT * FROM boards ORDER BY id DESC"
  );
  return result.rows;
};

const deleteBoard = async (id) => {
  const result = await pool.query(
    "DELETE FROM boards WHERE id = $1 RETURNING *",
    [id]
  );
  return result;
};

module.exports = {
  createBoard,
  getBoards,
  deleteBoard,
};