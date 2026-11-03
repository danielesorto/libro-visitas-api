import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { pool } from "./db.js";

const app = express();
app.set("trust proxy", 1);
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

const esquemaMensaje = z.object({
  nombre: z
    .string({ error: "Escribe tu nombre" })
    .trim()
    .min(2, "El nombre debe tener al menos 2 letras")
    .max(40, "El nombre puede tener máximo 40 letras"),
  texto: z
    .string({ error: "Escribe un mensaje" })
    .trim()
    .min(2, "El mensaje es muy corto")
    .max(280, "El mensaje puede tener máximo 280 caracteres"),
});

// Revisa que la API y la base de datos estén funcionando
app.get("/api/salud", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ estado: "ok", baseDeDatos: "conectada" });
  } catch (error) {
    console.error("Error de base de datos:", error.message);
    res.status(500).json({ estado: "error", baseDeDatos: "sin conexión" });
  }
});

// Los 50 mensajes más recientes
app.get("/api/mensajes", async (req, res) => {
  try {
    const [filas] = await pool.query(
      "SELECT id, nombre, texto, creado_en FROM mensajes ORDER BY id DESC LIMIT 50"
    );
    res.json(filas);
  } catch (error) {
    console.error("Error al leer los mensajes:", error.message);
    res.status(500).json({ error: "No se pudieron cargar los mensajes" });
  }
});

// Guardar un mensaje nuevo
app.post("/api/mensajes", async (req, res) => {
  const resultado = esquemaMensaje.safeParse(req.body ?? {});
  if (!resultado.success) {
    return res.status(400).json({ error: resultado.error.issues[0].message });
  }

  const { nombre, texto } = resultado.data;
  try {
    const [respuesta] = await pool.query(
      "INSERT INTO mensajes (nombre, texto) VALUES (?, ?)",
      [nombre, texto]
    );
    const [filas] = await pool.query(
      "SELECT id, nombre, texto, creado_en FROM mensajes WHERE id = ?",
      [respuesta.insertId]
    );
    res.status(201).json(filas[0]);
  } catch (error) {
    console.error("Error al guardar el mensaje:", error.message);
    res.status(500).json({ error: "No se pudo guardar el mensaje" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});
