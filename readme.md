# Личный проект «Типотека» [![Build status][travis-image]][travis-url]

* Студент: [Александр Андреев](https://up.htmlacademy.ru/nodejs/3/user/1475223).
* Наставник: [Вадим Осюков](https://htmlacademy.ru/profile/id1411353).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`, `.travis.yml`, `package.json`._

---

### Установка

#### 1. Создайте файл .env, объявите в нем следующие переменные (пример - файл .env.example в корневой директории)

```sh
# Пользователь бд
DB_USER=<пользователь>
# Пароль пользователя бд
DB_PASSWORD=<пароль>
# Имя бд
DB_NAME=<имя_базы_данных>
```
#### 2. Выполните команду ````npm run generate::secret```` - эта команда генерирует ключи JWT и APP в файле .env

#### 3. Выполните команду ```` npm run migrate ```` - применяет миграции к бд (или ````npm run migrate::refresh```` - очищает бд и заново применяет миграции)

#### 4. Выполните команду(опционально) ```` npm run filldb ```` - заполняет бд тестовыми данными

#### 5. ```` npm run start ```` или ```` npm run start::debug ```` - запускает front и api сервер в prod и debug режимах соотвественно

### Памятка

#### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

#### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

#### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

#### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/intensive/ecmascript"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/ecmascript/logo-for-github.svg"></a>

Репозиторий создан для обучения на интенсивном онлайн‑курсе «[Node.js, уровень 1](https://htmlacademy.ru/intensive/nodejs)» от [HTML Academy](https://htmlacademy.ru).

[travis-image]: https://travis-ci.com/htmlacademy-nodejs/1475223-typoteka-3.svg?branch=master
[travis-url]: https://travis-ci.com/htmlacademy-nodejs/1475223-typoteka-3
