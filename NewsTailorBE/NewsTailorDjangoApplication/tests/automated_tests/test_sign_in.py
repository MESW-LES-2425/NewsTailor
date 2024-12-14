# Generated by Selenium IDE
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def sign_in(self):
    self.driver.get("http://localhost:5173/")
    self.driver.set_window_size(1512, 823)
    self.driver.find_element(By.ID, "button-auth").click()
    self.driver.find_element(By.NAME, "username").send_keys("user@gmail.com")
    self.driver.find_element(By.NAME, "password1").send_keys("12345Aa!")
    self.driver.find_element(By.ID, "sign-up-email").send_keys("user@gmail.com")
    self.driver.find_element(By.ID, "sign-up-password").send_keys("12345Aa!")
    self.driver.find_element(By.ID, "login-button-id").click()


class TestSignIn:
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

    def test_configuration(self):
        sign_in(self)


