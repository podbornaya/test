# Tilda Patterns

Каталог кастомных блоков для Tilda (пока с первым блоком «Бегущая строка»).

## Локальный запуск

```bash
python3 -m http.server 4173
```

Открыть: <http://127.0.0.1:4173>

## Публикация на GitHub Pages

Проект уже настроен на автодеплой через GitHub Actions (`.github/workflows/deploy-pages.yml`).

### Что нужно сделать в репозитории GitHub

1. Запушить код в ветку `main` или `master`.
2. Открыть **Settings → Pages**.
3. В разделе **Build and deployment** выбрать **Source: GitHub Actions**.
4. Дождаться выполнения workflow **Deploy static site to GitHub Pages** во вкладке **Actions**.

После успешного деплоя сайт будет доступен по адресу:

- `https://<your-username>.github.io/<repo-name>/`

> Если это user/organization-репозиторий вида `<your-username>.github.io`, URL будет `https://<your-username>.github.io/`.
