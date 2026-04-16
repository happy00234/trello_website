const pool = require("../db");

// CREATE MEMBER
const createMember = async (name, avatar) => {
  const result = await pool.query(
    "INSERT INTO members (name, avatar) VALUES ($1, $2) RETURNING *",
    [name, avatar]
  );
  return result.rows[0];
};

// ASSIGN MEMBER TO CARD
const addMemberToCard = async (card_id, member_id) => {
  const result = await pool.query(
    "INSERT INTO card_members (card_id, member_id) VALUES ($1, $2) RETURNING *",
    [card_id, member_id]
  );
  return result.rows[0];
};

// GET MEMBERS OF CARD
const getMembersByCard = async (cardId) => {
  const result = await pool.query(
    `SELECT m.* FROM members m
     JOIN card_members cm ON m.id = cm.member_id
     WHERE cm.card_id = $1`,
    [cardId]
  );
  return result.rows;
};

// REMOVE MEMBER FROM CARD
const removeMemberFromCard = async (card_id, member_id) => {
  await pool.query(
    "DELETE FROM card_members WHERE card_id = $1 AND member_id = $2",
    [card_id, member_id]
  );
};

module.exports = {
  createMember,
  addMemberToCard,
  getMembersByCard,
  removeMemberFromCard,
};