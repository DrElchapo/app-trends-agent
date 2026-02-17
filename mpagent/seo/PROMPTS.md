# Промпты для генерации изображений — MP Agent

## Что должен считывать человек за 2 секунды

OG-image видят в Telegram, VK, поисковой выдаче. Человек не читает — он СКАНИРУЕТ.
За 2 секунды должно считаться:

1. **Это софт для маркетплейсов** (не курсы, не агентство, не фриланс)
2. **AI делает работу за тебя** (дашборд работает, графики растут)
3. **Wildberries + Ozon** (узнаваемость, "это про меня")
4. **Выглядит как реальный продукт** (не абстракция, а интерфейс)

---

## Палитра (из CSS сайта)

- Фон: #0B0D14
- Primary cyan: #06B6D4
- Emerald: #34D399
- Violet: #8B5CF6
- Текст: #EDF0F7
- Card: #13161F
- Border: #1E2130
- Шрифт: Manrope Bold (для текста поверх), JetBrains Mono (для цифр)

---

## 1. OG-Image (1200×630)

### Концепция

Не абстрактный баннер, а скриншот-мокап дашборда в перспективе.
Человек видит: "о, это реальный софт, там графики растут, это работает".
Текст "MP Agent" и подпись — наложить в Figma/Canva поверх ПОСЛЕ генерации.

### Промпт

```
A realistic dark-mode SaaS dashboard screenshot floating in perspective, slightly tilted at 5-10 degrees, viewed from above-left angle.

The dashboard shows a marketplace analytics interface with:
- Top row: 4 metric cards showing revenue "₽2.4M" with green up-arrow "+18%", orders "1,847" with green "+12%", average check "₽1,290", and ad efficiency "8.2% ДРР" with green down-arrow
- Main area: a large revenue line chart trending upward over 30 days, the line is bright cyan (#06B6D4) with a soft gradient fill below it fading to transparent. The chart clearly shows growth
- Side panel: a product list with small thumbnail images, product names, prices in rubles, stock quantities, and small green/amber status badges
- Bottom section: a bar chart comparing advertising spend (in violet #8B5CF6) vs revenue (in emerald green #34D399), showing revenue significantly higher than spend

The dashboard has dark background #0B0D14, cards with dark glass effect (#13161F with thin borders #1E2130), rounded corners everywhere, clean modern sans-serif typography. Status indicators glow softly.

The floating dashboard casts a very subtle shadow and has a slight reflection below it. Background behind the dashboard: solid very dark #08090F with a subtle radial glow of cyan (#06B6D4 at 5% opacity) behind the dashboard center, creating depth.

No text overlays, no logos, no decorative elements outside the dashboard. Clean empty space on the left third of the image for text to be added later.

Style: photorealistic UI render, dark mode, looks like a real working application. High detail. Figma/Dribbble quality mockup presentation. 1200x630 aspect ratio.
```

### Альтернативный промпт (мультиэкран — больше фич)

```
Dark presentation mockup showing three floating glassmorphism UI cards arranged in a slight arc, each tilted at different angles, hovering over a dark #0B0D14 background.

Left card: "AI Content" screen — a product card editor showing a marketplace product listing with an AI-generated SEO title highlighted in cyan (#06B6D4) and a quality score badge showing "92/100" in emerald green (#34D399).

Center card (largest, front): Main dashboard with a revenue chart trending strongly upward in cyan, four KPI metrics at the top (revenue in rubles, orders count, margin percentage, ad efficiency), clean dark UI #13161F with thin borders.

Right card: "Pricing" screen — a table of products with current prices, competitor prices, and AI-recommended prices highlighted in cyan. Small green arrows showing price optimization suggestions.

All cards have dark glass effect with subtle blur, thin borders #1E2130, rounded corners, soft colored glows matching their accent colors. Cards cast subtle shadows on the dark background.

Generous empty space at the top-left area of the image for text overlay to be added later.

Background: solid #08090F with very faint scattered particles or dots of light. No abstract gradients. Clean and focused on the UI cards.

Style: premium SaaS product showcase, Dribbble hero shot quality. Photorealistic UI render. 1200x630 aspect ratio.
```

### Альтернативный промпт (AI-agent в действии — эмоциональный)

```
Dark-mode split composition, 1200x630 pixels.

Right two-thirds: a floating dark dashboard interface showing a marketplace product management screen. Visible elements: a product listing with photos of real consumer goods (electronics, clothing), prices in rubles (₽), green growth indicators "+23%", a line chart going up in cyan (#06B6D4), and a small notification popup saying a task was completed automatically. The dashboard has dark glass cards (#13161F), thin borders, rounded corners, clean modern typography.

Left third: empty dark space (#0B0D14) for text overlay, with only a very subtle glow — a small cluster of floating cyan (#06B6D4) sparkle particles or a tiny abstract AI-node constellation (3-4 connected dots) suggesting intelligence at work. This glow is minimal and does not distract.

The dashboard appears to be actively working — one card shows a spinning/loading indicator, another shows a freshly completed AI task with a green checkmark, suggesting the AI agent is performing actions right now.

Background: deep dark #08090F. No decorative borders, no gradients, no abstract art. The dashboard IS the hero.

Style: realistic SaaS product screenshot with premium presentation. Dark mode. High fidelity UI mockup. Clean.
```

---

## 2. App Icon (512×512)

### Концепция

Иконка должна считываться на 16×16 в таббаре и на 512×512 на PWA экране.
Не буквы (MP нечитаемо на 16px). Символ — AI-агент, который работает за тебя.

### Промпт (основной — AI-agent робот)

```
App icon, 512x512 pixels, iOS rounded square shape.

Dark background: radial gradient from #13161F center to #0B0D14 edges.

Center: a minimal, friendly AI robot head seen from front. The head is a rounded rectangle shape in white (#EDF0F7) with two circular eyes that glow in bright cyan (#06B6D4). The eyes have a subtle inner glow. A very small antenna or single spark on top of the head, also in cyan. The robot expression is neutral-friendly, like a professional assistant.

The robot head is simple enough to be recognizable at 16x16 pixels — just a rounded shape with two glowing dots and a small accent on top. No mouth. No body. No arms. Just the iconic head.

Subtle shadow below the robot head. Very faint circular glow of cyan behind the head creating a halo effect at 10% opacity.

Style: flat design with minimal depth. Clean iconography. Must work at all sizes from 16px to 512px. Think Notion, Linear, or Vercel icon quality — simple, bold, memorable. Dark mode.
```

### Альтернативный (щит + молния — безопасность + скорость)

```
App icon 512x512px, iOS rounded square.

Background: solid #0B0D14.

Center: a minimal shield shape outlined in bright cyan (#06B6D4), line weight 2-3px at this scale. Inside the shield: a small stylized lightning bolt in white (#EDF0F7), symbolizing speed and automation.

The shield has very slightly rounded corners. A subtle cyan glow around the shield outline (soft, not harsh). No other decorative elements.

Ultra simple, two-color (white + cyan on dark). Recognizable at 16px — the shield and bolt must read clearly. No gradients on the symbols. Flat design.

Style: security meets speed. Professional SaaS. Similar icon quality to 1Password or Stripe app icons.
```

### Альтернативный (пульс-график — рост бизнеса)

```
App icon 512x512px, iOS rounded square.

Background: solid #0B0D14.

Center: a bold upward-trending line chart made of a single thick stroke. The line starts from bottom-left, dips slightly, then curves sharply upward to top-right. The line transitions from emerald green (#34D399) at the start to bright cyan (#06B6D4) at the peak.

At the peak of the line: a small circle or dot that glows in cyan, like a live data point.

Below the line: a very subtle fill/shadow in cyan at 10% opacity, creating an area-chart effect.

No grid lines, no axes, no numbers. Just the iconic growth line. Must read at 16px as "something going up".

Style: minimal, bold, dark-mode. Financial/analytics app aesthetic. Clean iconography.
```

---

## 3. Текст для наложения поверх OG-Image (в Figma/Canva)

AI плохо рендерит текст, особенно кириллицу. Генерируем фон без текста,
потом накладываем в редакторе.

### Макет текста (левая треть OG-image):

**Строка 1** (Manrope ExtraBold, 48px, белый #EDF0F7):
```
MP Agent
```

**Строка 2** (Manrope Medium, 22px, серый #94A3B8):
```
AI-менеджер маркетплейсов
```

**Строка 3** (JetBrains Mono Medium, 16px, в двух pill-бейджах):
```
[Wildberries]  [Ozon]
```
Бейдж Wildberries: фон #6B21A8/15%, текст #A78BFA (violet)
Бейдж Ozon: фон #0369A1/15%, текст #38BDF8 (blue)

**Строка 4** (Manrope Regular, 14px, muted #64748B), опционально:
```
от 7 900 ₽/мес · заменяет специалиста
```

---

## Чеклист качества

- [ ] На превью в Telegram (маленький квадрат ~200px) понятно что это софт?
- [ ] Видно что графики растут (позитивный тренд)?
- [ ] Считывается за 2 секунды без чтения текста?
- [ ] Не выглядит как реклама курсов или инфобизнес?
- [ ] Иконка читается на 16×16?
- [ ] На тёмном фоне Telegram/VK не сливается?
