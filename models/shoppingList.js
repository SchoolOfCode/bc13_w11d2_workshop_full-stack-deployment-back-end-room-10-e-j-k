import { pool } from "../db/index.js";

export async function getShoppingList() {
  const data = await pool.query("SELECT * FROM shopping ORDER BY id;");
  console.log("The shopping list is", data.rows);
  return data.rows;
}

export async function postListItem(listItem) {
  const { item, completed } = listItem;
  const data = await pool.query(
    `INSERT INTO shopping (
      item,
      completed
    ) VALUES ($1,$2) RETURNING *;`,
    [item, completed]
  );
  return data.rows[0];
}

export async function clearList() {
  const data = await pool.query("DELETE FROM shopping;");
}

export async function markItem(id, body) {
  const data = await pool.query(
    "UPDATE shopping SET completed = $1 WHERE id = $2 RETURNING *;",
    [body.marked, id]
  );
  return data.rows[0];
}
