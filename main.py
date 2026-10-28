"""Mouse Tester - portable mouse diagnostics (buttons, wheel, polling rate).

UI is HTML/CSS/JS (Material 3 style) shown in a native window via pywebview
(Edge WebView2, which ships with Windows 10/11).
"""
import os
import sys

import webview


def resource(*parts):
    base = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base, *parts)


def main():
    webview.create_window(
        "Mouse Tester",
        resource("assets", "index.html"),
        width=1180,
        height=780,
        min_size=(860, 620),
        background_color="#faf8ff",
    )
    # private_mode: nothing is written to disk, so the exe stays truly portable
    webview.start(private_mode=True)


if __name__ == "__main__":
    main()
