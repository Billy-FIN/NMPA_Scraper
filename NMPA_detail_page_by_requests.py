'''
After reading the source code carefully and then figuring out how the website of Chinese National Medical Products 
Administration works, we can use Python to replicate the request and signiture in order to get the json file 
from the database api. It is much faster than Selenium.

This file is used to extract data from the detail-page.

Weakness: Don't make requests too frequently. The remote server may limit your IP.

@Author: Qiuyang Wang
@Email: billyfinnn@gmail.com
@Date: 7/31/2023
'''


import requests
import time
from urllib import parse
import hashlib
from selenium import webdriver
import threading
from fake_useragent import UserAgent
import pyautogui
import data_saver_program.data_saver as database


class detail_page_scraper():
    def __init__(self, itemId_name):
        # config
        self.url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/queryDetail'
        self.itemId_list = {
            # other itemIds can be found in NMPA_DATA.json in the /resources
            "医疗器械经营企业（许可）": "ff8080818046502f0180df06de3234d8",
            "医疗器械经营企业（备案）": "ff8080818046502f0180df094b2a3506",
            "境内医疗器械（注册）": "ff80808183cad7500183cb66fe690285",
            "境内医疗器械（备案）": "ff80808183cad7500183cb68075c02d7",
            "进口医疗器械（注册）": "ff808081830b103501838d4871b53543",
            "进口医疗器械（备案）": "ff808081830b103501838d49d7ce3572",
        }
        self.itemId = self.itemId_list[itemId_name]
        self.db = database.data_saver()
        self.ua = UserAgent()
        self.cookies_pool = []
        self.driver_pool = []
        self.proxy_pool = [{'http': 'http://zinroot:zryiyao3412@1.15.80.199:11388',
                            'https': 'https://zinroot:zryiyao3412@1.15.80.199:11388'},
                           {'http': 'http://zinroot:zryiyao3412@1.15.240.185:11388',
                            'https': 'https://zinroot:zryiyao3412@1.15.240.185:11388'},
                           {'http': 'http://zinroot:zryiyao3412@1.117.73.170:11388',
                            'https': 'https://zinroot:zryiyao3412@1.117.73.170:11388'},
                           {'http': 'http://zinroot:zryiyao3412@101.43.99.206:11388',
                            'https': 'https://zinroot:zryiyao3412@101.43.99.206:11388'},
                           ]
        # use default ip
        options = webdriver.FirefoxOptions()
        options.add_argument("--headless")
        driver = webdriver.Firefox(options=options)
        driver.get('https://www.nmpa.gov.cn/')
        self.driver_pool.append(driver)
        cookies = self.compose_cookies(driver.get_cookies())
        self.cookies_pool.append(cookies)
        # if the program needs to use proxies
        if len(self.proxy_pool) != 0:
            # use selenium to get extra cookies
            for proxy in self.proxy_pool:    
                options = webdriver.FirefoxOptions()
                options.add_argument("--headless")
                options.add_argument("--proxy-server=" + proxy['http'])
                driver = webdriver.Firefox(options=options)
                driver.get('https://www.nmpa.gov.cn/')
                self.driver_pool.append(driver)
                cookies = self.compose_cookies(driver.get_cookies())
                self.cookies_pool.append(cookies)
        print("Scraper is ready!")
        

# -------------------------------------------------------------------------------------------------
#
# Functions to ensure a successful operation 
#
# -------------------------------------------------------------------------------------------------


    # refresh the page opened by the selenium websriver
    # and then get the new cookie
    def refresh_cookies(self, index_of_proxy):
        print('\n' + 'Refreshing cookies...' + '\n')
        driver = self.driver_pool[index_of_proxy]
        driver.refresh()
        self.cookies_pool[index_of_proxy] = self.compose_cookies(driver.get_cookies())
        print('\n' + 'Refreshing completed!\n')

    # used for getting a new cookie
    def compose_cookies(self, cookies):
        strr = ''
        for c in cookies:
            strr += c['name']
            strr += '='
            strr += c['value']
            strr += ';'
        return strr[:-1]

    # generate a signiture for the use of headers
    # the signiture will vary due to different timestamps
    def get_sign(self, dic):
        array = []
        for key in dic:
            array.append(key + '=' + str(dic[key]))
        array = self.paramsStrSort('&'.join(array))
        return self.jsonmd5ToString(array)

    # encoding method for the signiture
    def jsonmd5ToString(self, ready_to_encode):
        ready_to_encode = ready_to_encode + "&nmpasecret2020"
        # encodeURICoponent
        a = parse.quote(ready_to_encode)
        # md5 encode
        m = hashlib.md5()
        m.update(a.encode('utf-8'))
        return m.hexdigest()

    # used for generating a signiture
    def paramsStrSort(self, a):
        a = a.split("&")
        a.sort()
        b = ''
        for i in a:
            b = b + str(i) + "&"
        return b[:-1]

    # get a new timestamp
    def get_timestamp(self):
        return str(round(time.time()) * 1000)

    # store detailed info in a database
    def details_save_in_db(self, data_seq, registered_id, company_name, legal_representative, person_in_charge_of_enterprise, residence_address, business_address, business_mode, business_scope, storage_address, issue_department, issue_date, exp):
        self.db.run_query(
            "INSERT INTO " + self.db.table_name + " VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);", (data_seq, registered_id, company_name, legal_representative, person_in_charge_of_enterprise, residence_address,
                                                                                                  business_address, business_mode, business_scope, storage_address, issue_department, issue_date, exp), False)

    # output the progress while operating the program
    def output_in_log(self, s):
        f = open('output.txt', 'a')
        f.write(s)
        f.close()


# -------------------------------------------------------------------------------------------------
#
# the function to obtain data of detail pages
#
# -------------------------------------------------------------------------------------------------


    # get the detail information after having Ids
    # !! Alert: the remote server has a strict rule in search of web scraping !!
    def get_detail_page(self, head, rear, index_of_proxy):
        try:
            for i in range(head, rear):
                start = time.time()
                # take out one id from the database
                id = self.db.run_query(
                    "SELECT company_id FROM public.company_overview ORDER BY data_seq ASC limit 1 offset " + str(i), (), (True))[0]
                t = self.get_timestamp()
                params = {
                    'itemId': self.itemId,
                    'id': str(id),
                    'timestamp': t
                }
                sign = self.get_sign(params)
                header = {
                    'User-Agent': self.ua.random,
                    'Sign': sign,
                    'Timestamp': t,
                    'Cookie': self.cookies_pool[index_of_proxy]
                }
                try:
                    res = requests.get(url=self.url,
                                       headers=header, params=params)#proxies=self.proxy_pool[index_of_proxy])
                    # If your IP is restricted by the server, it will get a 400 error
                    if str(res.status_code) == "400":
                        raise RuntimeError
                    elif str(res.status_code) != "200":
                        raise Exception
                except RuntimeError:
                    print("Detected by the server!")
                    pyautogui.alert("Alert")
                except Exception:
                    # if the cookie is expired, let Selenium refresh the page to get a new one
                    self.refresh_cookies(index_of_proxy)
                    header = {
                        'User-Agent': self.ua.random,
                        'Sign': sign,
                        'Timestamp': t,
                        'Cookie': self.cookies_pool[index_of_proxy]
                    }
                    res = requests.get(url=self.url,
                                       headers=header, params=params)#proxies=self.proxy_pool[index_of_proxy])
                    if str(res.status_code) != "200":
                        # if it still fails, the programmer needs to check it out
                        print(res.status_code)
                        print('Fail!')
                        pyautogui.alert("Alert")
                finally:
                    # get the data successfully
                    d = res.json()['data']['detail']
                    try:
                        self.details_save_in_db(str(i + 1), d['f0'], d['f1'], d['f2'], d['f3'], d['f4'],
                                                d['f5'], d['f6'], d['f7'], d['f8'], d['f9'], d['f10'], d['f11'])
                        end = time.time()
                        print('company ' + str(i + 1) +
                            ' finished. Time spent: ', end - start)
                    except KeyError as e:
                        self.output_in_log("information lost: " + str(i + 1) + "\n")
                        print(e)
                    time.sleep(5)
        except Exception as e:
            print(e)
            print(res.status_code)
            print(res.text)
            self.output_in_log("Stops at " + "company " + str(i) + "\n")
            time.sleep(120)
            # restart from where it stops
            self.output_in_log("Resume...\n")
            self.get_detail_page(i, rear, index_of_proxy)
        else:
            self.output_in_log(str(head) + " to " +
                               str(rear) + ", done\n")


# -------------------------------------------------------------------------------------------------
#
# Main method: multi-threads
#
# -------------------------------------------------------------------------------------------------


if __name__ == "__main__":
    main_thread_start = time.time()
    spider = detail_page_scraper("医疗器械经营企业（许可）")
    tmp = 0
    workload = [[0, 50], [50, 100], [100, 150], [150, 200], [200, 250]]
    thread_list = []
    for task in workload:
        thread = threading.Thread(name="t" + str(tmp),
                                  target=spider.get_detail_page, args=(task[0], task[1], tmp))
        thread_list.append(thread)
        tmp += 1
    for thread in thread_list:
        thread.start()
    for thread in thread_list:
        thread.join()
    for driver in spider.driver_pool:
        driver.quit()
    main_thread_end = time.time()
    print('Done. Time spent: ', main_thread_end - main_thread_start)
   