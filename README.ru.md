<div align="center">

<img src="images/logo.png" width="128" alt="Mouse Tester logo" />

<h1>Mouse Tester</h1>

<p>
  <a href="README.md"><img src="https://img.shields.io/badge/README-English-8E8E93?style=for-the-badge&labelColor=161618" alt="English README"></a>
  <a href="README.ru.md"><img src="https://img.shields.io/badge/README-Русский-8E8E93?style=for-the-badge&labelColor=161618" alt="Russian README"></a>
</p>

<p>
  <a href="https://github.com/BadHuko/mouse-tester/releases/latest"><img src="https://img.shields.io/github/v/release/BadHuko/mouse-tester?style=for-the-badge&labelColor=161618&color=3b5bdb" alt="Последний релиз"></a>
  <a href="https://github.com/BadHuko/mouse-tester/releases"><img src="https://img.shields.io/github/downloads/BadHuko/mouse-tester/total?style=for-the-badge&labelColor=161618&color=3b5bdb" alt="Скачивания"></a>
  <img src="https://img.shields.io/badge/Windows-10%20%7C%2011-8E8E93?style=for-the-badge&labelColor=161618" alt="Windows 10/11">
  <img src="https://img.shields.io/badge/portable-без%20установки-8E8E93?style=for-the-badge&labelColor=161618" alt="Portable">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-8E8E93?style=for-the-badge&labelColor=161618" alt="MIT"></a>
</p>

<p>
  <a href="https://github.com/BadHuko/mouse-tester/releases/latest/download/MouseTester.exe"><img src="https://img.shields.io/badge/%E2%AC%87%20%D0%A1%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C%20MouseTester.exe-3b5bdb?style=for-the-badge&labelColor=3b5bdb" alt="Скачать MouseTester.exe"></a>
</p>

<br>

<img src="images/demo.gif" width="820" alt="Mouse Tester — кнопки, колесо, геймпад">

</div>

<br>

Портативный тестер мыши и геймпада для Windows с интерфейсом Material 3. Без установщика, без прав администратора и без записи на диск: скачал один `.exe`, запустил, проверил, удалил.

Сделано потому, что колесо мыши стало туго нажиматься, но при этом нормально крутится — что там: микрик, энкодер или просто грязь? Теперь это можно проверить.

## Что проверяет

| | |
|---|---|
| **Кнопки мыши** | Все 5 кнопок (левая, колесо, правая, назад, вперёд): счётчик нажатий, время удержания, **дребезг контактов** (повторное нажатие быстрее 50 мс) |
| **Клик по колесу** | Нажми колесо 10 / 20 / 50 раз: засчитано ли каждое нажатие? Среднее/мин/макс удержание, двойные срабатывания, вердикт простым языком |
| **Прокрутка** | Тики вверх/вниз, горизонтальный наклон, **тики в обратную сторону** — классический признак грязного или изношенного энкодера |
| **Геймпад** | Xbox / PlayStation / Nintendo / универсальный: определение типа и производителя, все кнопки (включая доп. и тачпад), аналоговые триггеры, оба стика с контуром хода, **тест дрейфа**, проверки состояния каждого стика, вибрация, частота опроса |
| **Частота опроса** | Реальная частота опроса мыши в Гц с живым графиком |
| **Журнал** | Все события с миллисекундными метками |

Светлая/тёмная тема и переключатель русский/английский — в верхней панели.

## Скриншоты

<table>
  <tr>
    <td><img src="images/ru/buttons.png" alt="Кнопки мыши"></td>
    <td><img src="images/ru/wheel.png" alt="Тест колеса"></td>
  </tr>
  <tr>
    <td><img src="images/ru/gamepad.png" alt="Тест геймпада"></td>
    <td><img src="images/light.png" alt="Светлая тема"></td>
  </tr>
</table>

## Колесо тугое, но нормально крутится

Открой **Колесо → Клик по колесу** и нажми колесо 10–20 раз.

- Все нажатия засчитаны, двойных срабатываний нет → электроника в порядке, туго из-за механики (пыль, износ пластика, пружинка).
- Есть **двойные срабатывания** → микропереключатель колеса изношен или грязный, один клик иногда считается за два. Прочисти или замени микрик.
- Есть **обратные тики** при прокрутке → энкодер грязный или изношен.

## Скачать

Бери `MouseTester.exe` из [последнего релиза](https://github.com/BadHuko/mouse-tester/releases/latest) и запускай. Нужна Windows 10/11 (используется встроенный Edge WebView2).

Windows SmartScreen может предупредить о неизвестном издателе, так как exe не подписан: нажми *Подробнее → Выполнить в любом случае* или собери сам (ниже).

## Сборка из исходников

Python 3.10+:

```bat
git clone https://github.com/BadHuko/mouse-tester
cd mouse-tester
build.bat
```

Результат: `dist\MouseTester.exe` (один файл, ~17 МБ). Запуск без сборки: `pip install -r requirements.txt && python main.py`.

Скриншоты и demo.gif в README генерирует `tools/make_screens.py` (настоящий ввод мышью, геймпад симулируется).

## Стек

Python + [pywebview](https://pywebview.flowrl.com/) для окна, собственный Material 3 UI на чистом HTML/CSS/JS (без внешних зависимостей, работает офлайн), PyInstaller для portable-exe, GitHub Actions для релизов.

## Лицензия

[MIT](LICENSE)
