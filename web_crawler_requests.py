import requests
import time
from urllib import parse
import hashlib
from selenium import webdriver


def get_cookie():
    options = webdriver.FirefoxOptions()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)
    driver.get('https://www.nmpa.gov.cn/datasearch/search-info.html?nmpa=aWQ9ZmZmZmRiZTNlYTJhMzE0MTk5MjBiNWJhYWM1ZmUzZjgmaXRlbUlkPWZmODA4MDgxODA0NjUwMmYwMTgwZGYwNmRlMzIzNGQ4')
    cookies = driver.get_cookies()
    strr = ''
    for c in cookies:
        strr += c['name']
        strr += '='
        strr += c['value']
        strr += ';'
    strr = strr[:-1]
    driver.quit()
    return strr


def get_sign(t):
    itemId = 'ff8080818046502f0180df06de3234d8'
    id = 'ffffd4473eeb2a7d373dc0ce84bb9079'
    str = 'itemId=' + itemId + '&id=' + id + '&timestamp=' + t
    str = paramsStrSort(str)
    return jsonmd5ToString(str)

def jsonmd5ToString(ready_to_encode):
    ready_to_encode = ready_to_encode + "&nmpasecret2020"
    a = parse.quote(ready_to_encode)
    return hex_md5(a)
    
def hex_md5(s):
    m = hashlib.md5()
    m.update(s.encode('utf-8'))
    return m.hexdigest()
    
def paramsStrSort(a):
    a = a.split("&")
    a.sort()
    b = ''
    for i in a:
        b = b + str(i) + "&"
    return b[:-1]

def get_timestamp():
    return str(round(time.time()) * 1000)

if __name__ == "__main__":
    t = get_timestamp()
    sign = get_sign(t)
    web_url = "https://www.nmpa.gov.cn/datasearch/data/nmpadata/queryDetail"
    header = {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        'Sign': sign,
        'Timestamp': t,
        # 'Accept:': "application/json, text/plain, */*",
        # 'Accept-Encoding': 'gzip, deflate, br',
        # 'Accept-Language': 'zh-CN,zh;q=0.9',
        # 'Connection': 'keep-alive',
        'Cookie': get_cookie()
        # 'Host': 'www.nmpa.gov.cn',
        # 'Referer': 'https://www.nmpa.gov.cn/datasearch/search-info.html?nmpa=aWQ9ZmZmZmRiZTNlYTJhMzE0MTk5MjBiNWJhYWM1ZmUzZjgmaXRlbUlkPWZmODA4MDgxODA0NjUwMmYwMTgwZGYwNmRlMzIzNGQ4',
        # 'Sec-Ch-Ua:': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        # 'Sec-Ch-Ua-Mobile:': '?0',
        # 'Sec-Ch-Ua-Platform': '"Windows"',
        # 'Sec-Fetch-Dest': 'empty',
        # 'Sec-Fetch-Mode': 'cors',
        # 'Sec-Fetch-Site': 'same-origin',
        # 'Token': 'false'
    }
    params = {
            'itemId': 'ff8080818046502f0180df06de3234d8',
            'id': 'ffffd4473eeb2a7d373dc0ce84bb9079',
            'timestamp': t
        }
    res = requests.get(url=web_url, headers=header, params=params)
    print(res.status_code)
    print(res.content.decode('utf-8'))
    
    