CREATE TABLE IF NOT EXISTS mensajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL,
  texto VARCHAR(280) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO mensajes (id, nombre, texto) VALUES
  (1, 'Docente', '¡Bienvenidos al libro de visitas del curso!'),
  (2, 'Ana', 'Mi primera aplicación publicada en internet.'),
  (3, 'Carlos', 'Saludos desde El Salvador.');
