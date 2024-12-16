# Generated by Selenium IDE
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from NewsTailorDjangoApplication.tests.automated_tests.test_sign_in import sign_in


class TestMainPageButtons:
    def setup_method(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--remote-debugging-port=9222")

        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

        self.vars = {}

    def teardown_method(self):
        self.driver.quit()

    def test_faq(self):
        sign_in(self)
        WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.ID, "FAQ-button"))
        ).click()

    def test_about(self):
        sign_in(self)
        WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.ID, "About-page-button"))
        ).click()

    def test_logout(self):
        sign_in(self)
        WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.ID, "Logout-button"))
        ).click()
