import requests
import time
from urllib import parse
import hashlib
from selenium import webdriver

class web_crawler_requests():
    def __init__(self, id_list, itemId, search_key='', page_size=10, page_num=1):
        # config
        self.id_list = id_list
        self.itemId = itemId
        self.search_key = search_key
        self.page_size = page_size
        self.page_num = page_num
        self.search_url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/search'
        self.detail_url = 'https://www.nmpa.gov.cn/datasearch/data/nmpadata/queryDetail'
        
        # use selenium to get the cookie
        options = webdriver.FirefoxOptions()
        options.add_argument("--headless")
        self.driver = webdriver.Firefox(options=options)
        self.driver.get('https://www.nmpa.gov.cn/')
        self.cookies = self.driver.get_cookies()
        strr = ''
        for c in self.cookies:
            strr += c['name']
            strr += '='
            strr += c['value']
            strr += ';'
        self.cookies = strr[:-1]
        self.driver.quit()

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
    
    
    def get_search_results(self):
        t = self.get_timestamp()
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
        res = requests.get(url=self.search_url, headers=header, params=params)
        print(res.status_code)
        print(res.content.decode('utf-8'))


if __name__ == "__main__":
    req = web_crawler_requests([], 'ff8080818046502f0180df06de3234d8', '经营')
    req.get_detail_page()