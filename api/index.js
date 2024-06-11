import express, { json } from "express";
const app = express();

import { createClient } from "@libsql/client";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

import { routerUser } from "../routes/users.js";
import { routerSettings } from "../routes/settings.js";
import { routerPayments } from "../routes/payments.js";

app.use("/api/users", routerUser);
app.use("/api/settings", routerSettings);
app.use("/api/payments", routerPayments);

export const client = createClient({
  url: "libsql://china-gym-alam-rodriguez.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTIyNjE4NzYsImlkIjoiNzFlYjc2Y2MtM2RjZS00NmUwLWI4ZTQtZDUyMTcyZDcyM2RlIn0.r_I0M6RM-oHQmuuTLMZtY46MS-Xn4dnCn2qG6UnneBvyw4gOOL5HpFmZUUe_9hH4QoW3Lnb_QCGWJyGUPGrdAw",
});

app.post("/set-tables", async (req, res) => {
  try {
    // await client.execute(`
    //   CREATE TABLE users(
    //     id INT PRIMARY KEY NOT NULL,
    //     name VARCHAR(255) NOT NULL,
    //     number VARCHAR(50) NOT NULL,
    //     address TEXT NOT NULL,
    //     email TEXT NOT NULL,
    //     genre TEXT NOT  NULL,
    //     state TEXT NOT NULL,
    //     userCreatedDate INT NOT NULL,
    //     registrationPricePaid INT NOT NULL,
    //     paymentUpTo INT NOT NULL
    //   );
    // `);
    // client.execute(`CREATE TABLE settings(
    //     registrationPrice INT NOT NULL,
    //     monthlyPrice INT NOT NULL,
    //     nameApp TEXT NOT NULL
    //   );
    // `);
    // await client.execute(`INSERT INTO settings(registrationPrice, monthlyPrice, nameApp) VALUES (1500, 1000, 'china-gym')`);
    // await client.execute(
    //   `CREATE TABLE payments(
    //     id INT PRIMARY KEY NOT NULL,
    //     user_id INT NOT NULL,
    //     paymentAmount int not null,
    //     paymentDate int not null,
    //     paymentMethod text not null
    //   );`
    // );

    // await client.execute("DROP TABLE payments;");
    // await client.execute("DROP TABLE settings;");
    // await client.execute("DROP TABLE users;");

    res.send("tables set");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.get("/", async (req, res) => {
  console.log("first");
  res.send("bien, como estan.");
});

// app.post("/api/create-user", async (req, res) => {
//   const body = req.body;
//   const result = await client.execute({
//     sql: `INSERT INTO users(id, name, number, address, email, genre, state, userCreatedDate)
//         VALUES (?,?,?,?,?,?,?,?);
//       `,
//     args: [body.id, body.name, body.number, body.address, body.email, body.genre, body.state, body.userCreatedDate],
//   });
//   console.log("---------------");
//   console.log(result);
//   res.status(201).json({ message: "user created" });
// });

// app.get("/api/get-users", async (req, res) => {
//   const result = await client.execute("SELECT * FROM users;");
//   if (result.rows.length > 0) res.status(302).json(result.rows);
//   else res.status(404).json([]);
// });

// app.g

// app.get("/api/get-settings", async (req, res) => {
//   const result = await client.execute("SELECT * FROM settings");
//   res.status(302).json(result.rows[0]);
// });

// app.put("/api/edit-settings", async (req, res) => {
//   const body = req.body;
//   const result = await client.execute({
//     sql: "UPDATE settings SET precioInscripcion = ?, precioMensualidad = ?, nameApp = ?;",
//     args: [body.precioInscripcion, body.precioMensualidad, body.nameApp],
//   });
//   console.log(result);
//   res.json({ message: "settings updated" });
// });

// app.post("/api/add-payment", async (req, res) => {
//   const { id, user_id, paymentAmount, paymentDate, paymentMethod } = req.body;
//   console.log(req.body);
//   const result = await client.execute({
//     sql: `INSERT INTO payments( id, user_id, paymentAmount, paymentDate, paymentMethod)
//        VALUES (?,?,?,?,?);
//     `,
//     args: [id, user_id, paymentAmount, paymentDate, paymentMethod],
//   });
//   console.log(result);
//   res.status(201).json({ message: "pago added" });
// });

// app.get("/api/get-pagos", async (req, res) => {
//   const result = await client.execute("SELECT * FROM payments");
//   if (result.rows.length > 0) res.status(302).json(result.rows);
//   else res.status(404).json([]);
// });

// app.get("/api/get-pagos/:user_id", async (req, res) => {
//   const user_id = req.params.id;
//   const result = await client.execute({
//     sql: "SELECT * FROM payments WHERE user_id = ?",
//     args: [user_id],
//   });

//   if (result.rows.length > 0) res.status(302).json(result.rows);
//   else res.status(404).json([]);
// });

// app.get('/api/get-pagos', async (req, res) => {
//   const result = await client.execute('SELECT * FROM pagos');
//   res.json(result.rows)
// });

// CREATE TABLE users(
//     id INT PRIMARY KEY NOT NULL,
//     nombre VARCHAR(255) NOT NULL,
//     telefono VARCHAR(50) NOT NULL,
//     direccion TEXT NOT NULL,
//     email TEXT NOT NULL,
//     estado TEXT NOT NULL,
//     fechaInText INT NOT NULL,
//     fechaUserCreatedInMilliseconds INT NOT NULL,
//     genero TEXT NOT NULL,
//   );

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`server runing on port http://localhost:${PORT}`);
});
