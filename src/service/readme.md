# Папка для сценариев API-сервиса
## Начало работы
```sh
## Применяет миграции
npm run migrate
## Генерирует ключи
npm run generate::secret
## Заполняет БД тестовыми данными
npm run filldb
## Запускает api server
npm run start-api-server
```
## Другие команды
```sh
## Откатывает миграции
npm run migrate::rollback
## То же самое, что и npm run migrate::rollback && npm run migrate
npm run migrate::refresh
## Запускает api + front-server
npm run start
```
