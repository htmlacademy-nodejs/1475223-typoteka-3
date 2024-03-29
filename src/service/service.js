'use strict';

const ConsoleCommandManager = require(`./cli/console-command-manager`);
const chalk = require(`chalk`);
const {
  generate,
  version,
  help,
  server,
  fill,
  filldb,
  secret
} = require(`./cli/commands`);

const command = process.argv[2];
const args = process.argv.slice(3);

const commandManager = new ConsoleCommandManager(`server`, `Программа запускает http-сервер и формирует файл с данными для API.`);

commandManager
  .add(`--generate`, `формирует файл mocks.json`, generate, [`count`])
  .add(`--fill`, `генерирует файл fill-db.sql со сформированными запросами для создания n-публикаций`, fill, [`n`])
  .add(`--version`, `выводит номер версии`, version)
  .add(`--secret`, `генерирует ключи`, secret)
  .add(`--help`, `печатает этот текст`, help)
  .add(`--server`, `запускает http-server`, server, [`port`])
  .add(`--filldb`, `заполняет базу данных объявлениями`, filldb, [`n`])
  .execute(command, args)
  .catch((err) => {
    console.log(chalk.red(`Ошибка`));
    console.log(err.stack);
    console.log(chalk.red(err.message));
    process.exit(1);
  });
