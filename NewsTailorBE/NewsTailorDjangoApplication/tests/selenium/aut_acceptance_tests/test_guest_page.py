from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


class TestGuestPage:
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

    def test_guest_page(self):
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1512, 823)
        self.driver.find_element(By.CSS_SELECTOR, ".info-card:nth-child(1) > p").click()
        self.driver.find_element(By.CSS_SELECTOR, ".info-card:nth-child(3) > p").click()
        self.driver.find_element(By.CSS_SELECTOR, ".info-card:nth-child(2) > p").click()
        self.driver.find_element(By.CSS_SELECTOR, ".info-card:nth-child(4) > p").click()
