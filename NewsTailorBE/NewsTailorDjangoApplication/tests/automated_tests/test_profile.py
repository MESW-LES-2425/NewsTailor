from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from NewsTailorDjangoApplication.tests.automated_tests.test_sign_in import sign_in


class TestProfile:
    def setup_method(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--remote-debugging-port=9222")

        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_profile(self):
        sign_in(self)

        # Wait for user profile link to appear and click it
        user_profile_link = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "userProfileLink"))
        )
        user_profile_link.click()

        # Wait for the button with the icon to be clickable and click it
        button_icon = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button > .icon"))
        )
        button_icon.click()

        # Perform hover action on the icon button
        actions = ActionChains(self.driver)
        actions.move_to_element(button_icon).perform()

        # Perform hover action on the body element
        body_element = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "body"))
        )
        actions.move_to_element(body_element).perform()

        # Wait for the username field to be clickable and interact with it
        username_field = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "username"))
        )
        username_field.click()
        username_field.clear()
        username_field.send_keys("User12")

        # Wait for the submit button to be clickable and click it
        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".blue-circle-button-submit"))
        )
        submit_button.click()
