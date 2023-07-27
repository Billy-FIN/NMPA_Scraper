'''
After reading the source code carefully and then figuring out how the website of Chinese National Medical Products 
Administration works, we can use Python to replicate the request and signiture in order to get the json file 
from the database api. It is much faster than Selenium.

Weakness: Don't make requests too frequently. The remote server may limit your IP.

@Author: Qiuyang Wang
@Email: billyfinnn@gmail.com
@Date: 7/27/2023
'''


import requests
import time
from urllib import parse
import hashlib
from selenium import webdriver
import random
import threading
from fake_useragent import UserAgent
import pyautogui
import data_saver_program.data_saver as database


class NMPA_scraper_byRequests():
    def __init__(self, itemId_name, search_key=''):
        # config
        self.search_url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/search'
        self.detail_url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/queryDetail'
        self.itemId_list = {
            # other itemIds can be found in NMPA_DATA.json in the /resources
            "医疗器械经营企业（许可）": "ff8080818046502f0180df06de3234d8",
            "医疗器械经营企业（备案）": "ff8080818046502f0180df094b2a3506",
            "境内医疗器械（注册）": "ff80808183cad7500183cb66fe690285",
            "境内医疗器械（备案）": "ff80808183cad7500183cb68075c02d7",
            "进口医疗器械（注册）": "ff808081830b103501838d4871b53543",
            "进口医疗器械（备案）": "ff808081830b103501838d49d7ce3572",
        }

        self.proxy_pool = [{'http': 'http://59.55.161.88:3256',
                            'https': 'https://59.55.161.88:3256'},
                           {'http': 'http://103.37.141.69:80',
                            'https': 'https://103.37.141.69:80'},
                           {'http': 'http://27.191.60.168:3256',
                            'https': 'https://27.191.60.168:3256'},
                           {'http': 'http://124.205.153.36:80',
                            'https': 'https://124.205.153.36:80'},
                           {'http': 'http://139.224.18.116:80',
                            'https': 'https://139.224.18.116:80'},
                           {'http': 'http://60.191.11.241:3128',
                            'https': 'https://60.191.11.241:3128'},
                           {'http': 'http://120.194.55.139:6969',
                            'https': 'https://120.194.55.139:6969'},
                           {'http': 'http://175.7.199.222:3256',
                            'https': 'https://175.7.199.222:3256'},
                           {'http': 'http://27.191.60.5:3256',
                            'https': 'https://27.191.60.5:3256'},
                           {'http': 'http://121.4.36.93:8888',
                            'https': 'https://121.4.36.93:8888'}]
        self.itemId = self.itemId_list[itemId_name]
        self.search_key = search_key
        self.page_size = 20
        self.cookies = None
        self.db = database.data_saver()
        self.ua = UserAgent()
        # use selenium to get the cookie
        options = webdriver.FirefoxOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Firefox(options=options)
        self.driver.get('https://www.nmpa.gov.cn/')
        cookies = self.driver.get_cookies()
        self.cookies = self.compose_cookies(cookies)


# -------------------------------------------------------------------------------------------------
#
# Functions to ensure a successful operation 
#
# -------------------------------------------------------------------------------------------------


    # refresh the page opened by the selenium websriver
    # and then get the new cookie
    def refresh_cookies(self):
        print('\n' + 'Refreshing cookies...' + '\n')
        self.driver.refresh()
        self.cookies = self.driver.get_cookies()
        self.cookies = self.compose_cookies(self.cookies)

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

    # store search results in a database
    def search_results_save_in_db(self, seq, id, name, link):
        self.db.run_query(
            "INSERT INTO " + self.db.table_name + " VALUES (%s,%s,%s,%s);", (seq, id, name, link), False)

    # store detailed info in a database
    def details_save_in_db(self, registered_id, company_name, legal_representative, person_in_charge_of_enterprise, residence_address, business_address, business_mode, business_scope, storage_address, issue_department, issue_date, exp):
        self.db.run_query(
            "INSERT INTO " + self.db.table_name + " VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);", (registered_id, company_name, legal_representative, person_in_charge_of_enterprise, residence_address,
                                                                                                  business_address, business_mode, business_scope, storage_address, issue_department, issue_date, exp), False)

    # output the progress while operating the program
    def output_in_log(self, s):
        f = open('output.txt', 'a')
        f.write(s)
        f.close()


# -------------------------------------------------------------------------------------------------
#
# Two functions to obtain data.
#       One is for search results - overview: a lot of companys or other medical stuff
#       The other is for detail page - detail infomation of each company or medical stuff
#
# -------------------------------------------------------------------------------------------------


    # get the detail information after having Ids
    # !! Alert: the remote server has a strict rule in search of web scraping !!
    def get_detail_page(self, head, rear):
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
                    'Cookie': self.cookies
                }
                res = requests.get(url=self.detail_url,
                                   headers=header, params=params)#, proxies=random.choice(self.proxy_pool))
                try:
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
                    print(res.status_code)
                    self.refresh_cookies()
                    header = {
                        'User-Agent': self.ua.random,
                        'Sign': sign,
                        'Timestamp': t,
                        'Cookie': self.cookies
                    }
                    res = requests.get(url=self.detail_url,
                                       headers=header, params=params)#, proxies=random.choice(self.proxy_pool))
                    if str(res.status_code) != "200":
                        # if it still fails, the programmer needs to check it out
                        print(res.status_code)
                        print('Fail!')
                        pyautogui.alert("Alert")
                finally:
                    # get the data successfully
                    d = res.json()['data']['detail']
                    self.details_save_in_db(d['f0'], d['f1'], d['f2'], d['f3'], d['f4'],
                                            d['f5'], d['f6'], d['f7'], d['f8'], d['f9'], d['f10'], d['f11'])
                    end = time.time()
                    print('company ' + str(i) +
                          ' finished. Time spent: ', end - start)
                    time.sleep(5)
        except Exception as e:
            print(e)
            self.output_in_log("Stops at " + "company " + str(i) + "\n")
            time.sleep(120)
            # restart from where it stops
            self.output_in_log("Resume...\n")
            self.get_detail_page(i, rear)
        else:
            self.output_in_log(str(head) + " to " +
                               str(rear) + ", done\n")

    # get the search results (all the overview data from a certain database)
    # this server does not have a strict rule to restrict your ip
    def get_search_results(self, start_page, end_page, current_seq=None):
        # ensure the correct line number for each data
        if current_seq == None:
            seq = start_page * 20 - 19
        else:
            seq = current_seq
            self.output_in_log("Resume...\n")
        try:
            count = 0
            # set a rule for the program to stop, avoiding the limitation made by the remote server
            for i in range(start_page, end_page):
                if (count % 50) == 0 and count != 0:
                    self.output_in_log("taking a nap...\n")
                    time.sleep(120)
                    self.output_in_log("Waking up...\n")
                start = time.time()
                t = self.get_timestamp()
                params = {
                    'itemId': self.itemId,
                    'isSenior': "N",
                    'searchValue': self.search_key,
                    'pageNum': i,
                    'pageSize': self.page_size,
                    'timestamp': t
                }
                sign = self.get_sign(params)
                header = {
                    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                    'Sign': sign,
                    'Timestamp': t,
                    'Cookie': self.cookies
                }
                # make a request
                res = requests.get(url=self.search_url,
                                   headers=header, params=params)
                try:
                    if str(res.status_code) != "200":
                        raise Exception
                except Exception:
                    # if the cookie is expired, let Selenium refresh the page to get a new one
                    self.refresh_cookies()
                    header = {
                        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                        'Sign': sign,
                        'Timestamp': t,
                        'Cookie': self.cookies
                    }
                    res = requests.get(url=self.search_url,
                                       headers=header, params=params)
                    if str(res.status_code) != "200":
                        # if it still fails, the programmer needs to check it out
                        print('Fail!')
                finally:
                    # get the data successfully
                    data = res.json()['data']['list']
                    for d in data:
                        self.search_results_save_in_db(seq, d['f0'], d['f1'], d['f2'])
                        seq += 1
                    end = time.time()
                    print('page ' + str(i) +
                          ' finished. Time spent: ', end - start)
                    count += 1
                    time.sleep(random.randint(1, 4))
        except Exception as e:
            # restart after resting 2 mins (recursion)
            print(e)
            self.output_in_log("Stops at data_seq " +
                               str(seq) + " page " + str(i) + "\n")
            time.sleep(120)
            # restart from where it stops
            self.get_search_results(i, end_page, seq)
            return
        else:
            self.output_in_log(str(start_page) + " to " +
                               str(end_page) + ", done\n")
            print()


# -------------------------------------------------------------------------------------------------
#
# Main method: multi-threads
#
# -------------------------------------------------------------------------------------------------


if __name__ == "__main__":
    req = NMPA_scraper_byRequests("医疗器械经营企业（许可）", '经营')
    url = 'http://icanhazip.com'
    header = {
        'User-Agent': req.ua.random
    }
    r = requests.get(url, headers=header,proxies={'http': 'http://217.113.122.142:3128',
                            'https': 'https://217.113.122.142:3128'})
    print(r.text)
    # main_thread_start = time.time()
    # req = NMPA_scraper_byRequests("医疗器械经营企业（许可）", '经营')
    # # req.get_detail_page(0, 100)
    # tmp = 1
    # workload = [[1, 10], [10, 20], [20, 30], [30, 40]]
    # thread_list = []
    # for task in workload:
    #     # if want to get search results
    #     #thread = threading.Thread(name="t" + str(tmp),
    #     #                          target=req.get_search_results, args=(task[0], task[1],))
    #     # if want to get detail pages
    #     thread = threading.Thread(name="t" + str(tmp),
    #                               target=req.get_detail_page, args=(task[0], task[1],))
    #     thread_list.append(thread)
    #     tmp += 1
    # for thread in thread_list:
    #     thread.start()
    # for thread in thread_list:
    #     thread.join()
    # req.driver.quit()
    # main_thread_end = time.time()
    # print('Done. Time spent: ', main_thread_end - main_thread_start)
