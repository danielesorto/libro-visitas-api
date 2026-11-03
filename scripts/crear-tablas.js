import fs from "fs";
import { pool } from "../src/db.js";

// Lee database/libro.sql y ejecuta cada instrucción (separadas por ;)
const sql = fs.readFileSync("database/libro.sql", "utf8");
const instrucciones = sql
  .split(";")
  .map((texto) => texto.trim())
  .filter((texto) => texto.length > 0);

try {
  for (const instruccion of instrucciones) {
    await pool.query(instruccion);
  }
  const [filas] = await pool.query("SELECT COUNT(*) AS total FROM mensajes");
  console.log(`Tabla lista. Mensajes guardados: ${filas[0].total}`);
} catch (error) {
  console.error("No se pudo crear la tabla:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
