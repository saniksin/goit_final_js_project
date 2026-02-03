# Your Energy — Fitness Exercises App

Вебзастосунок для перегляду каталогу вправ, пошуку за категоріями та керування обраними. Проєкт побудований на Vite та Vanilla JS, адаптивний для мобільних, планшетів і десктопів.

## Демо
- Live: https://saniksin.github.io/goit_final_js_project/

## Можливості
- Каталог вправ із фільтрами **Muscles / Body parts / Equipment**
- Пошук і пагінація
- Модальне вікно з деталями вправи та рейтингом
- Обрані вправи (зберігаються **ID** у localStorage, дані оновлюються з API)
- Цитата дня
- Повністю адаптивна верстка

## Технології
- HTML5, CSS3
- Vanilla JavaScript (ES Modules)
- Vite
- Axios
- modern-normalize

## Швидкий старт

### Вимоги
- Node.js (LTS)

### Встановлення
```bash
npm install
```

### Розробка
```bash
npm run dev
```

### Збірка
```bash
npm run build
```

### Перегляд зібраної версії
```bash
npm run preview
```

> Збірка виконується з базою `/goit_final_js_project/` для коректної роботи на GitHub Pages.

## Структура проєкту
```
src/
  css/            # стилі
  fonts/          # шрифти
  img/            # статичні зображення
  js/             # логіка застосунку
  partials/       # HTML-частини (інжект через Vite)
  index.html
  favorites.html
```

## API
Базовий URL: `https://your-energy.b.goit.study/api`

Використовуються ендпоінти:
- `GET /quote` — цитата дня
- `GET /filters` — категорії
- `GET /exercises` — список вправ
- `GET /exercises/:id` — деталі вправи
- `PATCH /exercises/:id/rating` — відправка рейтингу
- `POST /subscription` — підписка

## Деплой
Проєкт розгорнуто на GitHub Pages. Збірка знаходиться в `dist/`.

