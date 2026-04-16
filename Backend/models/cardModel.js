const pool = require("../db");

const createCard = async (title, list_id) => {
  const result = await pool.query(
    "INSERT INTO cards (title, list_id) VALUES ($1, $2) RETURNING *",
    [title, list_id]
  );
  return result.rows[0];
};

const getCardsByList = async (listId) => {
  const result = await pool.query(
    "SELECT * FROM cards WHERE list_id = $1 ORDER BY id",
    [listId]
  );
  return result.rows;
};

const updateCard = async (id, title, description, due_date, label) => {
  const result = await pool.query(
    `UPDATE cards 
     SET title = $1,
         description = $2,
         due_date = $3,
         label = $4
     WHERE id = $5
     RETURNING *`,
    [title, description, due_date, label, id]
  );
  return result;
};

module.exports = {
  createCard,
  getCardsByList,
  updateCard,
};