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

function runMysql(sql) {
  const args = ['-u', MYSQL_USER, '-h', MYSQL_HOST];

  if (MYSQL_PASSWORD) {
    args.push(`-p${MYSQL_PASSWORD}`);
  }

  const result = spawnSync('mysql', args, {
    input: sql,
    encoding: 'utf-8',
    stdio: ['pipe', 'inherit', 'inherit'],
  });

  if (result.error?.code === 'ENOENT') {
    throw new Error(
      'Le client MySQL (`mysql`) est introuvable. Installez mysql-client ou exécutez le fichier scripts/setup-mysql.sql avec un autre outil pour provisionner la base.'
    );
  }

  if (result.status !== 0) {
    throw new Error(`mysql command exited with status ${result.status}`);
  }
}

function main() {
  try {
    const sql = readFileSync(sqlFilePath, 'utf-8');
    console.log('Initialisation de la base de données MySQL locale...');
    runMysql(sql);
    console.log(
      `Base de données "${DB_NAME}" et tables essentielles configurées sur ${MYSQL_HOST} avec l'utilisateur ${MYSQL_USER} (mot de passe vide).`
    );
  } catch (error) {
    console.error('Erreur lors de la configuration de la base de données MySQL:', error.message);
    process.exit(1);
  }
}

main();
