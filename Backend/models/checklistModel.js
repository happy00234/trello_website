const pool = require("../db");

const addItem = async (card_id, text) => {
  const result = await pool.query(
    "INSERT INTO checklist (card_id, text) VALUES ($1, $2) RETURNING *",
    [card_id, text]
  );
  return result.rows[0];
};

const getItems = async (cardId) => {
  const result = await pool.query(
    "SELECT * FROM checklist WHERE card_id = $1",
    [cardId]
  );
  return result.rows;
};

const toggleItem = async (id) => {
  const result = await pool.query(
    `UPDATE checklist 
     SET is_done = NOT is_done 
     WHERE id = $1 
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  addItem,
  getItems,
  toggleItem,
};