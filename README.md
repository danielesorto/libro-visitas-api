# Libro de visitas · API

API del ejercicio de publicación del curso Desarrollo Web Full Stack Junior.

## Rutas

| Método | Ruta | Qué hace |
| --- | --- | --- |
| GET | `/api/salud` | Revisa que la API y la base de datos funcionen |
| GET | `/api/mensajes` | Los 50 mensajes más recientes |
| POST | `/api/mensajes` | Guarda un mensaje (`nombre`, `texto`) |

## Variables de entorno

`PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL` (solo con Aiven) y `FRONTEND_URL` (solo en producción). Copia `.env.ejemplo` como `.env` y escribe tus valores.

## Cómo ejecutarla

```bash
pnpm install
pnpm db:crear   # crea la tabla mensajes
pnpm dev
```

## Tecnologías

Node.js, Express 5, MySQL (mysql2) y Zod.
