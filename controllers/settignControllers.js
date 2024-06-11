import { client } from "../api/index.js";

export const getSettings = async (req, res) => {
  const result = await client.execute("SELECT * FROM settings");
  res.status(302).json(result.rows[0]);
};

export const putSettings = async (req, res) => {
  const body = req.body;
  const result = await client.execute({
    sql: "UPDATE settings SET precioInscripcion = ?, precioMensualidad = ?, nameApp = ?;",
    args: [body.precioInscripcion, body.precioMensualidad, body.nameApp],
  });
  console.log(result);
  res.json({ message: "settings updated" });
};
