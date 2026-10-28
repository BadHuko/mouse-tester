@echo off
rem Builds a portable single-file MouseTester.exe into dist\
python -m pip install -r requirements.txt || exit /b 1
python tools\make_icon.py || exit /b 1
python -m PyInstaller --noconfirm --onefile --windowed --name MouseTester --icon assets\icon.ico --add-data "assets;assets" main.py || exit /b 1
echo.
echo Done: dist\MouseTester.exe