# Анализ трендов мобильных приложений

## Текущие тренды 2025 года

### 1. Искусственный интеллект и машинное обучение
- Персонализация контента в реальном времени
- Автоматизация задач
- Предиктивная аналитика
- Чат-боты и виртуальные ассистенты

### 2. AR/VR технологии
- Дополненная реальность в розничной торговле
- Виртуальная реальность в образовании
- Интерактивные покупки
- Иммерсивные игры

### 3. 5G интеграция
- Стриминг высокого разрешения
- Низкая задержка для игр
- Улучшенная работа AR/VR
- IoT интеграция

### 4. Кроссплатформенная разработка
- Flutter и React Native
- Единый код для iOS и Android
- Снижение затрат на разработку

### 5. Интернет вещей (IoT)
- Управление умным домом
- Носимые устройства
- Здоровье и фитнес
- Автоматизация процессов

### 6. Безопасность и приватность
- Биометрическая аутентификация
- Шифрование данных
- Соответствие GDPR/CCPA
- Zero-trust архитектура

### 7. Микро-приложения и супер-приложения
- Мини-программы внутри платформ
- WeChat, Telegram Mini Apps
- Быстрый доступ к функциям

### 8. Voice-first интерфейсы
- Голосовые команды
- Интеграция с умными колонками
- Accessibility улучшения

## Источники данных

### Официальные API
1. **App Store Connect API** - официальный API Apple
2. **Google Play Developer API** - официальный API Google
3. **Firebase Analytics API** - аналитика Google
4. **Google Analytics Reporting API** - веб и мобильная аналитика

### Публичные данные
1. **App Store** - парсинг страниц приложений
2. **Google Play** - парсинг страниц приложений
3. **Рейтинги и отзывы** - анализ пользовательского контента

### Сторонние сервисы
1. **Sensor Tower API** - рыночная аналитика (платный)
2. **App Annie API** - конкурентная аналитика (платный)
3. **SimilarWeb API** - трафик и метрики (платный)

## Структура проекта

```
mobile-app-trends-analyzer/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   │   └── configuration.ts
│   ├── data-sources/
│   │   ├── app-store-connect/
│   │   │   ├── app-store-connect.module.ts
│   │   │   ├── app-store-connect.service.ts
│   │   │   └── dto/
│   │   ├── google-play/
│   │   │   ├── google-play.module.ts
│   │   │   ├── google-play.service.ts
│   │   │   └── dto/
│   │   ├── firebase-analytics/
│   │   │   ├── firebase-analytics.module.ts
│   │   │   ├── firebase-analytics.service.ts
│   │   │   └── dto/
│   │   ├── google-analytics/
│   │   │   ├── google-analytics.module.ts
│   │   │   ├── google-analytics.service.ts
│   │   │   └── dto/
│   │   └── public-scraper/
│   │       ├── public-scraper.module.ts
│   │       ├── public-scraper.service.ts
│   │       └── dto/
│   ├── analyzers/
│   │   ├── trend-analyzer.module.ts
│   │   ├── trend-analyzer.service.ts
│   │   └── dto/
│   └── common/
│       ├── interfaces/
│       └── utils/
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## Установка и настройка

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# App Store Connect
APP_STORE_CONNECT_KEY_ID=your_key_id
APP_STORE_CONNECT_ISSUER_ID=your_issuer_id
APP_STORE_CONNECT_KEY_PATH=./path/to/AuthKey.p8

# Google Play
GOOGLE_PLAY_SERVICE_ACCOUNT_PATH=./path/to/service-account.json
GOOGLE_PLAY_PACKAGE_NAME=com.your.package

# Firebase Analytics
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CREDENTIALS_PATH=./path/to/firebase-credentials.json

# Google Analytics
GOOGLE_ANALYTICS_PROPERTY_ID=your-property-id
GOOGLE_ANALYTICS_CREDENTIALS_PATH=./path/to/analytics-credentials.json
```

### 3. Получение учетных данных

#### App Store Connect API
1. Перейдите в [App Store Connect](https://appstoreconnect.apple.com)
2. Users and Access → Keys → App Store Connect API
3. Создайте новый ключ и скачайте файл `.p8`
4. Сохраните Key ID и Issuer ID

#### Google Play Developer API
1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте проект или выберите существующий
3. Включите Google Play Android Developer API
4. Создайте Service Account и скачайте JSON ключ

#### Firebase Analytics
1. Перейдите в [Firebase Console](https://console.firebase.google.com)
2. Выберите проект
3. Project Settings → Service Accounts
4. Сгенерируйте новый приватный ключ

#### Google Analytics
1. Перейдите в [Google Analytics](https://analytics.google.com)
2. Admin → Property Settings
3. Получите Property ID
4. Используйте те же credentials, что и для Google Play API

## Использование

### Запуск приложения

```bash
# Разработка
npm run start:dev

# Продакшн
npm run build
npm run start:prod
```

### API Endpoints

#### Анализ App Store
```
GET /analyze/app-store/:appId?days=30
```

Пример:
```bash
curl http://localhost:3000/analyze/app-store/1234567890?days=30
```

#### Анализ Google Play
```
GET /analyze/google-play/:packageName?days=30
```

Пример:
```bash
curl http://localhost:3000/analyze/google-play/com.example.app?days=30
```

#### Публичные данные
```
GET /analyze/public?appStoreId=1234567890&googlePlayPackage=com.example.app
```

#### Комплексный анализ
```
GET /analyze/comprehensive?appStoreId=1234567890&googlePlayPackage=com.example.app&days=30
```

## Методы получения данных

### 1. App Store Connect API

**Что получаем:**
- Список приложений
- Статистика загрузок
- Отчеты о продажах
- Отзывы пользователей

**Как работает:**
- Использует JWT токены с ES256 алгоритмом
- Токены генерируются автоматически и кешируются
- Требует приватный ключ (.p8) от Apple

### 2. Google Play Developer API

**Что получаем:**
- Общая статистика
- Отзывы пользователей
- Установки по странам
- Установки по типам устройств

**Как работает:**
- Использует Service Account аутентификацию
- Требует JSON ключ от Google Cloud Console
- Автоматически управляет сессиями редактирования

### 3. Firebase Analytics

**Что получаем:**
- События приложения
- Метрики пользователей
- Данные удержания (retention)

**Как работает:**
- Подключается к Firestore базе данных
- Требует credentials JSON файл
- Читает данные из коллекций analytics

### 4. Google Analytics Reporting API

**Что получаем:**
- Активные пользователи
- Сессии
- События
- Данные по источникам трафика

**Как работает:**
- Использует Google Analytics Data API v1beta
- Требует Property ID и credentials
- Поддерживает кастомные метрики и измерения

### 5. Публичный парсинг

**Что получаем:**
- Информация о приложении (название, разработчик, рейтинг)
- Описание и категория
- Скриншоты
- Отзывы пользователей

**Как работает:**
- Использует HTTP запросы и Cheerio для парсинга HTML
- Не требует аутентификации
- Может быть ограничен rate limits магазинов

## Важные замечания

1. **Rate Limits**: Все API имеют ограничения на количество запросов. Реализуйте retry логику и кеширование.

2. **Аутентификация**: Храните все ключи и credentials в безопасном месте, не коммитьте их в репозиторий.

3. **Парсинг**: Публичный парсинг может сломаться при изменении структуры страниц магазинов. Используйте официальные API когда возможно.

4. **Ошибки**: Все сервисы обрабатывают ошибки и выбрасывают понятные сообщения.

5. **Асинхронность**: Все методы асинхронные и используют Promise.all для параллельных запросов где возможно.

