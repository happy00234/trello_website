const pool = require("../db");

const createCard = async (title, list_id) => {
  const result = await pool.query(
    "INSERT INTO cards (title, list_id) VALUES ($1, $2) RETURNING *",
    [title, list_id],
  );
  return result.rows[0];
};

const getCardsByList = async (listId) => {
  const result = await pool.query(
    "SELECT * FROM cards WHERE list_id = $1 ORDER BY id",
    [listId],
  );
  return result.rows;
};

const updateCard = async (id, fields) => {
  const { title, description, due_date, label } = fields;

  const result = await pool.query(
    `UPDATE cards SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      due_date = COALESCE($3, due_date),
      label = COALESCE($4, label)
     WHERE id = $5
     RETURNING *`,
    [
      title ?? null,
      description ?? null,
      due_date ?? null,
      label ?? null,
      id,
    ]
  );

  return result;
};
const deleteCard = async (id) => {
  const result = await pool.query(
    "DELETE FROM cards WHERE id = $1 RETURNING *",
    [id],
  );
  return result;
};
const updateCardMembers = async (card_id, member_id) => {
  // check if already exists
  const exists = await pool.query(
    "SELECT * FROM card_members WHERE card_id = $1 AND member_id = $2",
    [card_id, member_id]
  );

  if (exists.rows.length > 0) {
    // remove
    await pool.query(
      "DELETE FROM card_members WHERE card_id = $1 AND member_id = $2",
      [card_id, member_id]
    );
    return { removed: true };
  } else {
    // add
    await pool.query(
      "INSERT INTO card_members (card_id, member_id) VALUES ($1, $2)",
      [card_id, member_id]
    );
    return { added: true };
  }
};

module.exports = {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  updateCardMembers,
};
