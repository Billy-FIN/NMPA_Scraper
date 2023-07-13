from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import data_saver_program.data_saver as database
import time
import csv


class CFDA_crawler():
    def __init__(self, browser, url):
        self.browser = browser
        self.url = url
        self.driver = None
        self.db = database.data_saver()

    def get_driver(self):
        if self.browser == "chrome":
            option = webdriver.ChromeOptions()
            # avoid rendering images, js, and other css
            prefs = {
                'profile.default_content_setting_values': {
                    'images': 2,
                    'permissions.default.stylesheet': 2,
                    'javascript': 2
                }
            }
            option.add_experimental_option("prefs", prefs)
            # anti anti-crawling method
            option.add_experimental_option(
                'excludeSwitches', ['enable-automation'])
            option.add_experimental_option('useAutomationExtension', False)
            option.add_argument("--disable-blink-features")
            option.add_argument(
                "--disable-blink-features=AutomationControlled")
            self.driver = webdriver.Chrome(options=option)
            self.driver.execute_cdp_cmd("Network.enable", {})
            self.driver.execute_cdp_cmd("Network.setExtraHTTPHeaders", {
                                        "headers": {"User-Agent": "browserClientA"}})
            self.driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
                "source": """
                                Object.defineProperty(navigator, 'webdriver', {
                                 get: () => undefined
                                })
                            """
            })
        elif self.browser == "firefox":
            options = webdriver.FirefoxOptions()
            options.add_argument("--headless")  # 设置火狐为headless无界面模式
            options.add_argument("--disable-gpu")
            self.driver = webdriver.Firefox(options=options)

    def open_webpage(self):
        self.get_driver()
        self.driver.get(self.url)
        self.driver.maximize_window()
        time.sleep(10)
        # close the pop-up window
        self.driver.find_element(
            By.XPATH, "/html/body/div[4]/div/div[5]/a[1]").click()
        # click the target database
        target_db = self.driver.find_element(
            By.XPATH, "/html/body/div/main/div[2]/div[2]/div[1]/div[1]/div[10]/a/span")
        self.driver.execute_script("arguments[0].click();", target_db)
        # use the search bar and clink
        search_box = self.driver.find_element(
            By.XPATH, "/html/body/div/main/div[1]/div[7]/div/div[2]/input")
        search_box.send_keys(
            '经营'
        )
        search_box.send_keys(Keys.ENTER)
        time.sleep(10)
        # adjust handle to focus on the new window
        handles = self.driver.window_handles
        self.driver.switch_to.window(handles[-1])
        # close the new pop-up window
        self.driver.find_element(
            By.XPATH, "/html/body/div[5]/div/div[5]/a[1]").click()
        time.sleep(2)
        # adjust the number of lines it displays
        '''
        drop_down_menu = self.driver.find_element(
            By.XPATH, "/html/body/div[1]/div[3]/div[3]/div/div/span[2]/div/div[1]/span")
        self.driver.execute_script("arguments[0].click();", drop_down_menu)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located(
            (By.XPATH, "/html/body/div[3]/div[1]/div[1]/ul/li[2]/span")))
        time.sleep(2)
        self.driver.find_element(
            By.XPATH, "/html/body/div[3]/div[1]/div[1]/ul/li[2]/span").click()
        '''

    def get_data(self):
        self.open_webpage()
        flag = True
        info = []
        original_window = self.driver.current_window_handle
        page_num = 1
        while flag:
            details = self.driver.find_elements(
                By.XPATH, "//button[@class='el-button el-button--primary el-button--mini']")
            line = 0
            # open every detailed page and acquire data
            for detailed_page in details:
                line += 1
                detailed_page.click()
                time.sleep(10)
                # switch to the detailed page
                self.driver.switch_to.window(self.driver.window_handles[-1])
                # get the data
                content = self.driver.find_elements(
                    By.XPATH, "//td[@class='el-table_1_column_2 is-left ']")
                for j in content:
                    # print(j.text)
                    info.append(j.text)
                # store the data to database immediately
                self.save_in_db(info)
                print("Finished the job on line " +
                      str(line) + ", page " + str(page_num))
                info = []
                # close and then back to the original page
                self.close_window(original_window)
            # open the next page
            try:
                # try to click the next-page button
                next_button = self.driver.find_element(
                    By.CLASS_NAME, 'btn-next')
                next_button.click()
                time.sleep(2)
            except Exception:
                flag = False
            finally:
                page_num += 1
        # job done
        print("Done")
        self.close_all()

    # if there are more than one window, close the current one and then switch to the original one
    def close_window(self, original_window):
        self.driver.close()
        self.driver.switch_to.window(original_window)

    # save the whole data to csv file (just once)
    # need to be modified in order to adjust to other purposes if you want to use this function
    def save_in_csv(self, data1, data2, data3):
        with open('D:\demo\Result.csv', 'w', encoding='utf-8-sig', newline='') as fp:
            file_write = csv.writer(fp)
            file_write.writerow(['注册证编号', '注册人名称', '产品名称'])
            num = len(data1)
            for i in range(0, num):
                file_write.writerow([data1[i], data2[i], data3[i]])

    # save the data to database
    # need to modify the function in data_saver.py if you want to use this function for crawling other websites
    def save_in_db(self, data):
        self.db.insert_data(data)

    def close_all(self):
        self.driver.quit()


if __name__ == "__main__":
    crawler = CFDA_crawler(
        "firefox", "https://www.nmpa.gov.cn/datasearch/home-index.html#category=ylqx")
    crawler.get_data()
