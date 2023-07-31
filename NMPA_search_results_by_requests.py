'''
After reading the source code carefully and then figuring out how the website of Chinese National Medical Products 
Administration works, we can use Python to replicate the request and signiture in order to get the json file 
from the database api. It is much faster than Selenium.

This file is used to extract data of the search results.

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
import random
import data_saver_program.data_saver as database


class search_results_scraper():
    def __init__(self, itemId_name, search_key):
        # config
        self.url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/search'
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
        self.search_key = search_key
        self.page_size = 20
        self.db = database.data_saver()
        # use selenium to get the cookie
        options = webdriver.FirefoxOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Firefox(options=options)
        self.driver.get('https://www.nmpa.gov.cn/')
        self.cookies = self.compose_cookies(self.driver.get_cookies())
        print("Scraper is ready!")
        

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
        self.cookies = self.compose_cookies(self.driver.get_cookies())
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

    # store search results in a database
    def search_results_save_in_db(self, seq, id, name, link):
        self.db.run_query(
            "INSERT INTO " + self.db.table_name + " VALUES (%s,%s,%s,%s);", (seq, id, name, link))

    # output the progress while operating the program
    def output_in_log(self, s):
        f = open('output.txt', 'a')
        f.write(s)
        f.close()


# -------------------------------------------------------------------------------------------------
#
# the function to obtain data of search results
#
# -------------------------------------------------------------------------------------------------


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
                try:
                    # make a request
                    res = requests.get(url=self.url, headers=header, params=params)
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
                    res = requests.get(url=self.url, headers=header, params=params)
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


# -------------------------------------------------------------------------------------------------
#
# Main method: multi-threads
#
# -------------------------------------------------------------------------------------------------


if __name__ == "__main__":
    main_thread_start = time.time()
    spider = search_results_scraper("医疗器械经营企业（许可）", "经营")
    tmp = 0
    workload = [[1, 1001], [1001, 2001], [2001, 3001], [3001, 4001]]
    thread_list = []
    for task in workload:
        thread = threading.Thread(name="t" + str(tmp),
                                  target=spider.get_search_results, args=(task[0], task[1]))
        thread_list.append(thread)
        tmp += 1
    for thread in thread_list:
        thread.start()
    for thread in thread_list:
        thread.join()
    spider.driver.quit()
    main_thread_end = time.time()
    print('Done. Time spent: ', main_thread_end - main_thread_start)
   