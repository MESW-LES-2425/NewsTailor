from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager  # To automatically manage ChromeDriver version


class TestViewProfilePage():
    def setup_method(self, method):
        # Set up Chrome options for headless mode
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run Chrome in headless mode
        chrome_options.add_argument("--no-sandbox")  # Required for CI environments
        chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome resource limits in CI
        chrome_options.add_argument("--remote-debugging-port=9222")  # Enable debugging if needed

        # Initialize the ChromeDriver with the options and automatically managed chromedriver
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_view_profile_page(self):
        # Test name: view_profile_page
        # Step # | name | target | value
        # 1 | open | / |
        self.driver.get("http://localhost:5173/")
        # 2 | setWindowSize | 1920x682 |
        self.driver.set_window_size(1920, 682)
        # 3 | click | css=.auth-button |
        self.driver.find_element(By.CSS_SELECTOR, ".auth-button").click()
        # 4 | type | name=username | exampleUser@gmail.com
        self.driver.find_element(By.NAME, "username").send_keys("exampleUser@gmail.com")
        # 5 | type | name=password1 | 12345Aa!
        self.driver.find_element(By.NAME, "password1").send_keys("12345Aa!")
        # 6 | type | css=.sign-in-form > .signin-signup-input-field:nth-child(2) > input | exampleUser@gmail.com
        self.driver.find_element(By.CSS_SELECTOR,
                                 ".sign-in-form > .signin-signup-input-field:nth-child(2) > input").send_keys(
            "exampleUser@gmail.com")
        # 8 | type | name=password | 12345Aa!
        self.driver.find_element(By.NAME, "password").send_keys("12345Aa!")
        # 9 | click | css=.sign-in-form |
        self.driver.find_element(By.CSS_SELECTOR, ".sign-in-form").click()
        # 10 | click | css=.sign-in-form > .signin-signup-input-field:nth-child(3) |
        self.driver.find_element(By.CSS_SELECTOR, ".sign-in-form > .signin-signup-input-field:nth-child(3)").click()
        # 11 | click | id=logginButton |
        self.driver.find_element(By.ID, "logginButton").click()
        # 12 | click | id=userProfileLink |
        # self.driver.find_element(By.ID, "userProfileLink").click()
