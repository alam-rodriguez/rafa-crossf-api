import { client } from "../api/index.js";

export const addPayment = async (req, res) => {
  try {
    const { id, user_id, paymentAmount, paymentDate, paymentMethod } = req.body;
    console.log(req.body);
    const result = await client.execute({
      sql: `INSERT INTO payments( id, user_id, paymentAmount, paymentDate, paymentMethod)
       VALUES (?,?,?,?,?);  
    `,
      args: [id, user_id, paymentAmount, paymentDate, paymentMethod],
    });
    console.log(result);
    res.status(201).json({ message: "pago added" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const getPayments = async (req, res) => {
  const result = await client.execute("SELECT * FROM payments");
  if (result.rows.length > 0) res.status(302).json(result.rows);
  else res.status(404).json([]);
};

export const getPaymentsByUser = async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  const result = await client.execute({
    sql: "SELECT * FROM payments WHERE user_id = ?",
    args: [user_id],
  });

  if (result.rows.length > 0) res.status(302).json(result.rows);
  else res.status(404).json([]);
};

export const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await client.execute({
      sql: `DELETE FROM payments WHERE id = ?`,
      args: [id],
    });
    console.log(result);
    res.json({ message: "Payment deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};
