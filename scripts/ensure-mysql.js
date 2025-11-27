import { readFileSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  MYSQL_CLIENT,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USER,
  mysqlCliArgs,
  mysqlConnectionLabel,
} from './mysql-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlFilePath = path.join(__dirname, 'setup-mysql.sql');
let mysqlClient = MYSQL_CLIENT;

function hydrateSqlTemplate(sql) {
  return sql.replace(/`mf_eats`/g, `\`${MYSQL_DATABASE}\``);
}

function tryMysqlCommand(command) {
  const result = spawnSync(command, ['--version'], { encoding: 'utf-8' });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      return false;
    }

    throw new Error(`Impossible d'exécuter la commande ${command} : ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`${command} --version a renvoyé le statut ${result.status}`);
  }

  mysqlClient = command;
  return true;
}

function assertMysqlAvailable() {
  if (tryMysqlCommand(mysqlClient)) {
    return true;
  }

  if (mysqlClient === 'mysql' && tryMysqlCommand('mariadb')) {
    console.warn('Client MySQL introuvable, fallback automatique vers le client MariaDB (`mariadb`).');
    return true;
  }

  console.warn(
    `Provisioning MySQL ignoré : le client MySQL (\`${mysqlClient}\`) est introuvable. Installez mysql-client ou ajoutez la commande à votre PATH pour activer le provisioning automatique.`
  );
  console.warn('Vous pouvez sinon exécuter le SQL manuellement : mysql -u root -h localhost < scripts/setup-mysql.sql');
  return false;
}

function runMysql(sql, { captureOutput = false } = {}) {
  const result = spawnSync(mysqlClient, mysqlCliArgs(), {
    input: sql,
    encoding: 'utf-8',
    stdio: captureOutput ? ['pipe', 'pipe', 'pipe'] : ['pipe', 'inherit', 'inherit'],
  });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      throw new Error(
        `Le client MySQL (commande \`${mysqlClient}\`) est introuvable. Installez le client MySQL ou ajoutez-le à votre PATH pour permettre le provisioning automatique.`
      );
    }

    throw new Error(`Impossible d'exécuter la commande ${mysqlClient} : ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`${mysqlClient} a renvoyé le statut ${result.status}`);
  }

  return result;
}

function databaseExists() {
  const result = runMysql(`SHOW DATABASES LIKE '${MYSQL_DATABASE}';`, { captureOutput: true });
  return result.stdout && result.stdout.includes(MYSQL_DATABASE);
}

function ensureDatabase() {
  const mysqlAvailable = assertMysqlAvailable();

  if (!mysqlAvailable) {
    return;
  }

  if (databaseExists()) {
    console.log(
      `La base de données "${MYSQL_DATABASE}" existe déjà sur ${mysqlConnectionLabel()}, aucun provisionnement nécessaire.`
    );
    return;
  }

  console.log(
    `La base de données "${MYSQL_DATABASE}" est absente sur ${mysqlConnectionLabel()}. Initialisation en cours...`
  );
  const sql = hydrateSqlTemplate(readFileSync(sqlFilePath, 'utf-8'));
  runMysql(sql);
  console.log(`Base de données "${MYSQL_DATABASE}" créée automatiquement et prête à l'emploi.`);
}

try {
  ensureDatabase();
} catch (error) {
  console.error('Erreur lors de la vérification ou de la création de la base MySQL :', error.message);
  process.exit(1);
}
