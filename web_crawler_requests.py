import requests
import time
from urllib import parse
import hashlib
from selenium import webdriver
import data_saver_program.data_saver as database
import random
import threading


class web_crawler_requests():
    def __init__(self, id_list, itemId, search_key='', page_size=20, page_num=1):
        # config
        self.id_list = id_list
        self.itemId = itemId
        self.search_key = search_key
        self.page_size = page_size
        self.page_num = page_num
        self.search_url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/search'
        self.detail_url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/queryDetail'
        self.cookies = None
        self.db = database.data_saver()
        # use selenium to get the cookie
        options = webdriver.FirefoxOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Firefox(options=options)
        self.driver.get('https://www.nmpa.gov.cn/')
        cookies = self.driver.get_cookies()
        self.cookies = self.compose_cookies(cookies)

    def refresh_cookies(self):
        print('\n' + 'Refreshing cookies...' + '\n')
        self.driver.refresh()
        self.cookies = self.driver.get_cookies()
        self.cookies = self.compose_cookies(self.cookies)

    def compose_cookies(self, cookies):
        strr = ''
        for c in cookies:
            strr += c['name']
            strr += '='
            strr += c['value']
            strr += ';'
        return strr[:-1]

    def get_sign(self, dic):
        array = []
        for key in dic:
            array.append(key + '=' + str(dic[key]))
        array = self.paramsStrSort('&'.join(array))
        return self.jsonmd5ToString(array)

    def jsonmd5ToString(self, ready_to_encode):
        ready_to_encode = ready_to_encode + "&nmpasecret2020"
        # encodeURICoponent
        a = parse.quote(ready_to_encode)
        # md5 encode
        m = hashlib.md5()
        m.update(a.encode('utf-8'))
        return m.hexdigest()

    def paramsStrSort(self, a):
        a = a.split("&")
        a.sort()
        b = ''
        for i in a:
            b = b + str(i) + "&"
        return b[:-1]

    def get_timestamp(self):
        return str(round(time.time()) * 1000)

    def save_in_db(self, seq, id, name, link):
        self.db.insert_data(seq, id, name, link)

    def get_detail_page(self):
        t = self.get_timestamp()
        params = {
            'itemId': self.itemId,
            'id': 'ffffdbe3ea2a31419920b5baac5fe3f8',
            'timestamp': t
        }
        sign = self.get_sign(params)
        header = {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            'Sign': sign,
            'Timestamp': t,
            'Cookie': self.cookies
        }
        res = requests.get(url=self.detail_url, headers=header, params=params)
        time.sleep(2)
        print(res.status_code)
        print(res.content.decode('utf-8'))

    def get_search_results(self, start_page, end_page, current_seq=None):
        if start_page == 1:
            seq = 1
        elif start_page == 500:
            seq = 9981
        elif start_page == 1000:
            seq = 19981
        elif start_page == 1500:
            seq = 29981
        elif start_page == 2000:
            seq = 39981
        elif start_page == 2500:
            seq = 49981
        elif start_page == 3000:
            seq = 59981
        elif start_page == 3500:
            seq = 69981
        elif start_page == 4000:
            seq = 79981
        elif start_page == 4500:
            seq = 89981
        else:
            seq = current_seq
            f = open('output.txt', 'a')
            f.write("Resume...\n")
            f.close()
        try:
            for i in range(start_page, end_page):
                if (i - start_page) == 100 or (i - start_page) == 200 or (i - start_page) == 400:
                    f = open('output.txt', 'a')
                    f.write("taking a nap...\n")
                    f.close()
                    time.sleep(120)
                    start_page = i
                    f = open('output.txt', 'a')
                    f.write("Waking up...\n")
                    f.close()
                start = time.time()
                t = self.get_timestamp()
                self.page_num = i
                params = {
                    'itemId': self.itemId,
                    'isSenior': "N",
                    'searchValue': self.search_key,
                    'pageNum': self.page_num,
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
                res = requests.get(url=self.search_url,
                                   headers=header, params=params)
                try:
                    if str(res.status_code) != "200":
                        raise Exception
                except Exception:
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
                        print('Fail')
                        break
                finally:
                    # print(res.content.decode('utf-8'))
                    data = res.json()['data']['list']
                    for d in data:
                        self.save_in_db(seq, d['f0'], d['f1'], d['f2'])
                        seq += 1
                    end = time.time()
                    print('page ' + str(i))# +
                        #  ' finished. Time spent: ', end - start)
                    #time.sleep(random.randint(1, 4))
        except Exception as e:
            print(e)
            f = open('output.txt', 'a')
            f.write("Stops at data_seq " + str(seq) + " page " + str(i) + "\n")
            f.close()
            time.sleep(120)
            self.get_search_results(i, end_page, seq)
            return
        f = open('output.txt', 'a')
        f.write(str(start_page) + " to " + str(end_page) + ", done\n")
        f.close()
        self.driver.quit()


if __name__ == "__main__":
    req = web_crawler_requests([], 'ff8080818046502f0180df06de3234d8', '经营')
    # req.get_search_results(1, 21210)
    workload = [[1, 500], [500, 1000], [1000, 1500], [1500, 2000], [2000, 2500], [
       2500, 3000], [3000, 3500], [3500, 4000], [4000, 4500], [4500, 5000]]
    thread_list = []
    for task in workload:
        thread = threading.Thread(
            target=req.get_search_results, args=(task[0], task[1],))
        thread_list.append(thread)
    for thread in thread_list:
        thread.start()
    for thread in thread_list:
        thread.join()
