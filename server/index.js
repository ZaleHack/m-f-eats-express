import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 3001;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mf_eats',
  waitForConnections: true,
  connectionLimit: 10,
});

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as ok');
    res.json({ status: 'ok', db: rows[0].ok });
  } catch (error) {
    console.error('Healthcheck MySQL error', error);
    res.status(500).json({ status: 'error', message: 'MySQL indisponible' });
  }
});

app.post('/api/forms', async (req, res) => {
  const { formType, data } = req.body || {};

  if (!formType || !data) {
    return res.status(400).send('Type de formulaire ou données manquantes');
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO form_submissions (form_type, payload) VALUES (?, ?)',
      [formType, JSON.stringify(data)]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de l'insertion MySQL", error);
    res.status(500).send("Impossible d'enregistrer le formulaire dans MySQL");
  }
});

app.listen(PORT, () => {
  console.log(`API M&F Eats démarrée sur le port ${PORT}`);
});
