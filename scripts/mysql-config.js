export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'mf_eats';
export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_USER = process.env.MYSQL_USER || 'root';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
export const MYSQL_CLIENT = process.env.MYSQL_CLIENT || 'mysql';

export function mysqlCliArgs() {
  const args = ['-u', MYSQL_USER, '-h', MYSQL_HOST];

  if (MYSQL_PASSWORD) {
    args.push(`-p${MYSQL_PASSWORD}`);
  }

  return args;
}

export function mysqlConnectionLabel() {
  const passwordLabel = MYSQL_PASSWORD ? '***' : '(mot de passe vide)';
  return `${MYSQL_USER}:${passwordLabel}@${MYSQL_HOST}/${MYSQL_DATABASE}`;
}
