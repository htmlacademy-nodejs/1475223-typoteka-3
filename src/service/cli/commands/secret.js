'use strict';

const dotenv = require(`dotenv`);
const fs = require(`fs`).promises;
const cryptoService = require(`../../crypto-service/crypto-service`);

// https://github.com/bkeepers/update-dotenv/
const escapeNewlines = (str) => {
  return str.replace(/\n/g, `\\n`);
};

const format = (key, value) => {
  return `${key}=${escapeNewlines(value)}`;
};

const updateEnv = async (env) => {
  const filename = `${process.cwd()}/.env`;

  try {
    const existing = dotenv.parse(await fs.readFile(filename, `utf-8`));
    env = {...existing, ...env};
  } catch (err) {
    if (err.code !== `ENOENT`) {
      throw err;
    }
  }

  const contents = Object.keys(env).map((key) => format(key, env[key])).join(`\n`);
  await fs.writeFile(filename, contents);

  process.env = {...process.env, ...env};
  return env;
};

const secret = async (_manager, _args) => {
  const jwtAccessSecret = cryptoService.secret();
  const jwtSecretRefresh = cryptoService.secret();
  const appKey = cryptoService.secret();

  await updateEnv({
    'JWT_SECRET_ACCESS': jwtAccessSecret,
    'JWT_SECRET_REFRESH': jwtSecretRefresh,
    'APP_KEY': appKey
  });
};

module.exports = secret;
