import { readFileSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const DB_NAME = 'mf_eats';
const MYSQL_HOST = 'localhost';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = '';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlFilePath = path.join(__dirname, 'setup-mysql.sql');

function runMysql(sql, { captureOutput = false } = {}) {
  const args = ['-u', MYSQL_USER, '-h', MYSQL_HOST];

  if (MYSQL_PASSWORD) {
    args.push(`-p${MYSQL_PASSWORD}`);
  }

  const result = spawnSync('mysql', args, {
    input: sql,
    encoding: 'utf-8',
    stdio: captureOutput ? ['pipe', 'pipe', 'pipe'] : ['pipe', 'inherit', 'inherit'],
  });

  if (result.error) {
    throw new Error(`Impossible d'exécuter la commande mysql : ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`mysql a renvoyé le statut ${result.status}`);
  }

  return result;
}

function databaseExists() {
  const result = runMysql(`SHOW DATABASES LIKE '${DB_NAME}';`, { captureOutput: true });
  return result.stdout && result.stdout.includes(DB_NAME);
}

function ensureDatabase() {
  if (databaseExists()) {
    console.log(`La base de données "${DB_NAME}" existe déjà, aucun provisionnement nécessaire.`);
    return;
  }

  console.log(`La base de données "${DB_NAME}" est absente. Initialisation en cours...`);
  const sql = readFileSync(sqlFilePath, 'utf-8');
  runMysql(sql);
  console.log(`Base de données "${DB_NAME}" créée automatiquement et prête à l'emploi.`);
}

try {
  ensureDatabase();
} catch (error) {
  console.error('Erreur lors de la vérification ou de la création de la base MySQL :', error.message);
  process.exit(1);
}
