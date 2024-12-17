from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def sign_up(self):
    self.driver.get("http://localhost:5173/")

    # Wait and click "button-auth"
    auth_button = WebDriverWait(self.driver, 20).until(
        EC.element_to_be_clickable((By.ID, "button-auth"))
    )
    auth_button.click()

    # Wait and click signup button in auth panel
    signup_button = WebDriverWait(self.driver, 20).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, ".auth-panel-left .auth-btn"))
    )
    signup_button.click()

    # Input username
    username_field = WebDriverWait(self.driver, 20).until(
        EC.visibility_of_element_located((By.NAME, "username"))
    )
    username_field.send_keys("user")

    # Input email
    email_field = WebDriverWait(self.driver, 20).until(
        EC.visibility_of_element_located((By.NAME, "email"))
    )
    email_field.send_keys("user@gmail.com")

    # Input password1
    password1_field = WebDriverWait(self.driver, 20).until(
        EC.visibility_of_element_located((By.NAME, "password1"))
    )
    password1_field.send_keys("12345Aa!")

    # Input password2
    password2_field = WebDriverWait(self.driver, 20).until(
        EC.visibility_of_element_located((By.NAME, "password2"))
    )
    password2_field.send_keys("12345Aa!")

    # Ensure register button is clickable and click
    register_button = WebDriverWait(self.driver, 20).until(
        EC.element_to_be_clickable((By.ID, "register-button"))
    )
    ActionChains(self.driver).move_to_element(register_button).click().perform()


class TestSignup:
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

    def test_configuration(self):
        sign_up(self)
