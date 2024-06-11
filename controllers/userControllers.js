import { client } from "../api/index.js";

export const createUser = async (req, res) => {
  const body = req.body;
  const result = await client.execute({
    sql: `INSERT INTO users(id, name, number, address, email, genre, state, userCreatedDate, registrationPricePaid, paymentUpTo)
        VALUES (?,?,?,?,?,?,?,?,?,?);  
      `,
    args: [body.id, body.name, body.number, body.address, body.email, body.genre, body.state, body.userCreatedDate, body.registrationPricePaid, body.paymentUpTo],
  });
  console.log("---------------");
  console.log(result);
  res.status(201).json({ message: "user created" });
};

export const getUsersActives = async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM users WHERE state = 'Active';");
    if (result.rows.length > 0) res.status(302).json(result.rows);
    else res.status(404).json({ message: "Users not founds" });
  } catch (e) {
    res.status(500).json({ message: "Error on server" });
  }
};

export const getUsers = async (req, res) => {
  const result = await client.execute("SELECT * FROM users;");
  if (result.rows.length > 0) res.status(302).json(result.rows);
  else res.status(404).json([]);
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  const result = await client.execute({
    sql: "SELECT * FROM users WHERE id = ?;",
    args: [id],
  });
  if (result.rows.length > 0) res.status(302).json(result.rows[0]);
  else res.status(404).json({ message: "User not found" });
};

export const setStatusUser = async (req, res) => {
  try {
    const id = req.params.id;
    const state = req.body.state;
    await client.execute({
      sql: `UPDATE users SET state = ? WHERE id = ?`,
      args: [state, id],
    });
    res.json({ message: "user state update" });
  } catch (e) {
    res.status(500).send("Error");
  }
};

export const changeUserPaymentUpTo = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentUpTo = req.body.paymentUpTo;
    await client.execute({
      sql: `UPDATE users SET paymentUpTo = ? WHERE id = ?`,
      args: [paymentUpTo, id],
    });
    res.json({ message: "users paymentUpTo changed" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { name, number, address, email, genre } = req.body;
    console.log(req.body);
    const id = req.params.id;
    const r = await client.execute({
      sql: `UPDATE users SET name = ?, number = ?, address = ?, email = ?, genre = ? WHERE id = ?`,
      args: [name, number, address, email, genre, id],
    });
    console.log(r);
    res.json({ message: "user updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};
