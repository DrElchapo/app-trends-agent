# SEO Deployment Guide — ai-commerce.online

## Что подготовлено

```
seo/
├── public/
│   ├── robots.txt          ← Скопировать в public/ фронтенда
│   └── sitemap.xml         ← Скопировать в public/ фронтенда
├── nginx/
│   └── ai-commerce.conf   ← Заменить текущий nginx конфиг
├── index.html              ← Заменить текущий index.html в корне фронтенда
├── structured-data.jsonld  ← Справочный файл (уже встроен в index.html)
└── DEPLOY.md               ← Этот файл
```

---

## Этап 1 — Файлы на сервер (делаешь ТЫ, 15 минут)

### 1.1 robots.txt и sitemap.xml

Скопировать в директорию `public/` React-проекта (Vite автоматически копирует
файлы из `public/` в `dist/` при билде):

```bash
cp seo/public/robots.txt  <путь-к-фронтенду>/public/
cp seo/public/sitemap.xml <путь-к-фронтенду>/public/
```

**Проверка после деплоя:**
```bash
curl https://ai-commerce.online/robots.txt
curl https://ai-commerce.online/sitemap.xml
```

### 1.2 index.html

Заменить `index.html` в корне фронтенд-проекта файлом `seo/index.html`.

**ВАЖНО:** После `vite build` хэши в именах файлов JS/CSS изменятся.
Vite сам обновит ссылки на ассеты в index.html при билде, так что
строки `src="/assets/index-DrVYvkhs.js"` будут перезаписаны.

Что добавлено в index.html:
- Исправлена цена: 5000 → 7900 ₽/мес
- canonical URL
- og:url, og:image (требует создания og-image.png — см. ниже)
- twitter:image
- hreflang
- meta robots с расширенными директивами
- 4 блока JSON-LD (SoftwareApplication, Organization, FAQPage, WebSite)
- `<noscript>` блок с контентом для ботов без JS-рендеринга
- Заготовки для Yandex Metrika и GA4 (раскомментировать после регистрации)

### 1.3 nginx конфиг

Заменить текущий конфиг:

```bash
sudo cp seo/nginx/ai-commerce.conf /etc/nginx/sites-available/ai-commerce.conf
sudo ln -sf /etc/nginx/sites-available/ai-commerce.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Что изменено:**
- www → non-www редирект (нужно добавить DNS A-запись для www)
- robots.txt и sitemap.xml отдаются как файлы, а не SPA-фоллбек
- Cache-Control: immutable для hashed assets
- gzip сжатие
- Убрано дублирование security headers
- Неизвестные URL возвращают 404 вместо 200
- Явный whitelist SPA-маршрутов

**Перед применением:**
- Проверить пути к SSL-сертификатам
- Проверить `root` путь к dist-директории
- Проверить порт бэкенда в `proxy_pass`

---

## Этап 2 — Создать og-image.png (делаешь ТЫ)

Нужно создать изображение 1200x630 px для превью в соцсетях.

Содержание:
- Логотип MP Agent
- Текст: "AI-менеджер маркетплейсов Wildberries и Ozon"
- Тёмный фон (#0B0D14) в стиле сайта
- Скриншот дашборда (опционально)

Положить в `public/og-image.png` фронтенда.

---

## Этап 3 — DNS (делаешь ТЫ)

Добавить A-запись для `www.ai-commerce.online` → тот же IP, что у ai-commerce.online.
Nginx уже настроен на редирект www → без www.

---

## Этап 4 — Регистрации (делаешь ТЫ)

### 4.1 Google Search Console
1. Зайти на https://search.google.com/search-console
2. Добавить ресурс → тип "Домен" → ai-commerce.online
3. Подтвердить через DNS (TXT-запись)
4. После подтверждения: Сайтмапы → Добавить → `sitemap.xml`

### 4.2 Yandex Webmaster
1. Зайти на https://webmaster.yandex.ru
2. Добавить сайт → ai-commerce.online
3. Подтвердить (DNS или мета-тег)
4. Индексирование → Файлы Sitemap → добавить URL sitemap.xml
5. Индексирование → Переобход страниц → добавить главную

### 4.3 Yandex Metrika
1. Зайти на https://metrika.yandex.ru
2. Создать счётчик
3. Вставить ID в index.html (раскомментировать блок Yandex Metrika)
4. Включить: Вебвизор, карта кликов, карта скроллов

### 4.4 Google Analytics 4
1. Зайти на https://analytics.google.com
2. Создать аккаунт → ресурс → поток (Web)
3. Получить Measurement ID (G-XXXXXXXXXX)
4. Вставить в index.html (раскомментировать блок GA4)

---

## Этап 5 — Иконки (делаешь ТЫ)

Сейчас icon-192.png и icon-512.png не существуют как файлы.
Нужно создать и положить в `public/`:

```
public/
├── favicon.ico          (16x16 + 32x32, .ico формат)
├── favicon-32.png       (32x32)
├── apple-touch-icon.png (180x180)
├── icon-192.png         (192x192 — уже в manifest.json)
├── icon-512.png         (512x512 — уже в manifest.json)
└── og-image.png         (1200x630 — для соцсетей)
```

Можно сгенерировать через https://realfavicongenerator.net/

---

## Этап 6 — В React-коде (делаешь ТЫ или я, если дашь доступ)

Для полноценного SEO в React SPA нужно сделать одно из:

### Вариант A: Prerender (рекомендую для лендинга)
Установить `vite-plugin-prerender`:
```bash
npm install vite-plugin-prerender --save-dev
```
Добавить в `vite.config.ts`:
```ts
import prerender from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/offer', '/privacy'],
    }),
  ],
})
```
Это сгенерирует готовый HTML для публичных страниц при билде.

### Вариант B: react-snap
```bash
npm install react-snap --save-dev
```
В `package.json`:
```json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "include": ["/", "/offer", "/privacy"],
    "skipThirdPartyRequests": true
  }
}
```

### Вариант C: Уникальные мета-теги для каждой страницы
Установить `react-helmet-async`:
```bash
npm install react-helmet-async
```
В каждом компоненте страницы:
```tsx
import { Helmet } from 'react-helmet-async';

function OfferPage() {
  return (
    <>
      <Helmet>
        <title>Договор-оферта — MP Agent</title>
        <meta name="description" content="Договор-оферта на оказание информационных услуг (SaaS) MP Agent..." />
        <link rel="canonical" href="https://ai-commerce.online/offer" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      {/* ... */}
    </>
  );
}
```

---

## Чеклист после деплоя

- [ ] `curl https://ai-commerce.online/robots.txt` — возвращает текст, не HTML
- [ ] `curl https://ai-commerce.online/sitemap.xml` — возвращает XML
- [ ] `curl -I https://ai-commerce.online/nonexistent` — возвращает 404
- [ ] `curl -I https://www.ai-commerce.online/` — 301 на https://ai-commerce.online/
- [ ] `curl -I https://ai-commerce.online/assets/index-*.js` — Cache-Control: immutable
- [ ] Google Rich Results Test: https://search.google.com/test/rich-results (проверить JSON-LD)
- [ ] PageSpeed Insights: https://pagespeed.web.dev/ (проверить Core Web Vitals)
- [ ] Валидатор Open Graph: https://developers.facebook.com/tools/debug/
- [ ] Yandex валидатор: https://webmaster.yandex.ru/tools/microtest/
