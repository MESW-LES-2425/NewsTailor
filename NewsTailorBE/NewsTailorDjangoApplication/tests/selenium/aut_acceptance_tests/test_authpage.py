from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


class TestAuthPage:
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

    def test_auth_page(self):
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1512, 823)
        self.driver.find_element(By.ID, "button-auth").click()
        # Animation to move to the sign-up page
        signup_button = WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".auth-panel-left .auth-btn"))
        )
        signup_button.click()
        # Animation to move to the sign-in page
        sign_in_button = WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".auth-panel-right .auth-btn"))
        )
        sign_in_button.click()
        # Retries the sign-up page animation
        signup_button = WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".auth-panel-left .auth-btn"))
        )
        signup_button.click()
        # Retries the sign-in page animation
        sign_in_button = WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".auth-panel-right .auth-btn"))
        )
        sign_in_button.click()
