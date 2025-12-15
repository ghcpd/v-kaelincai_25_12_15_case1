from playwright.sync_api import sync_playwright


def run_tests():
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        logs = []
        def handle_console(msg):
            text_val = ""
            try:
                text_val = msg.text()
            except Exception:
                text_attr = getattr(msg, "text", "")
                if callable(text_attr):
                    try:
                        text_val = text_attr()
                    except Exception:
                        text_val = str(text_attr)
                else:
                    text_val = str(text_attr)
            logs.append(text_val)

        page.on("console", handle_console)
        page.goto("http://localhost:8000", wait_until="load")

        # Test 1: Password toggle
        password_input = page.locator("#password")
        toggle_btn = page.locator("#passwordToggle")
        password_input.fill("Test123!")
        type_before = password_input.get_attribute("type")
        toggle_btn.click()
        type_after = password_input.get_attribute("type")
        eye_open_display = page.locator(".eye-open").evaluate("el => getComputedStyle(el).display")
        eye_closed_display = page.locator(".eye-closed").evaluate("el => getComputedStyle(el).display")
        toggle_btn.click()
        type_after_second = password_input.get_attribute("type")
        results["password_toggle"] = {
            "type_before": type_before,
            "type_after": type_after,
            "type_after_second": type_after_second,
            "eye_open_display": eye_open_display,
            "eye_closed_display": eye_closed_display,
        }

        # Test 2: Duplicate submission prevention
        page.locator("#email").fill("test@example.com")
        password_input.fill("Test123!")
        login_button = page.locator("#loginBtn")
        # Simulate 5 rapid clicks programmatically to emulate a user clicking quickly
        page.evaluate(
            """
            const btn = document.getElementById('loginBtn');
            for (let i = 0; i < 5; i++) {
                btn.click();
            }
            """
        )
        disabled_state = login_button.is_disabled()
        btn_text = page.locator(".btn-text").inner_text()
        spinner_display = page.locator(".loading-spinner").evaluate("el => getComputedStyle(el).display")

        # Count login attempts in console logs
        login_attempt_logs = [log for log in logs if log.startswith("Login attempt")] 

        # Wait for simulated API response (2s)
        page.wait_for_timeout(2200)
        disabled_state_after = login_button.is_disabled()
        btn_text_after = page.locator(".btn-text").inner_text()
        spinner_display_after = page.locator(".loading-spinner").evaluate("el => getComputedStyle(el).display")

        results["duplicate_submission"] = {
            "disabled_initial": disabled_state,
            "btn_text_initial": btn_text,
            "spinner_display_initial": spinner_display,
            "login_attempt_logs_count": len(login_attempt_logs),
            "disabled_after": disabled_state_after,
            "btn_text_after": btn_text_after,
            "spinner_display_after": spinner_display_after,
            "logs": logs,
        }

        browser.close()
    return results


if __name__ == "__main__":
    import json
    res = run_tests()
    print(json.dumps(res, indent=2))
