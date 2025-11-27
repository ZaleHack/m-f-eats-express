import { readFileSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER, mysqlCliArgs, mysqlConnectionLabel } from './mysql-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlFilePath = path.join(__dirname, 'setup-mysql.sql');

function hydrateSqlTemplate(sql) {
  return sql.replace(/`mf_eats`/g, `\`${MYSQL_DATABASE}\``);
}

function runMysql(sql) {
  const result = spawnSync('mysql', mysqlCliArgs(), {
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
    const sql = hydrateSqlTemplate(readFileSync(sqlFilePath, 'utf-8'));
    console.log('Initialisation de la base de données MySQL locale...');
    runMysql(sql);
    console.log(
      `Base de données "${MYSQL_DATABASE}" et tables essentielles configurées sur ${mysqlConnectionLabel()}.`
    );
  } catch (error) {
    console.error('Erreur lors de la configuration de la base de données MySQL:', error.message);
    process.exit(1);
  }
}

main();
