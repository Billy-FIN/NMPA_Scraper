import requests
import time

sign = 'cad5184f5ea673372ec92149b9709a8'
t = str(int(round(time.time()) * 1000))
url = "https://www.nmpa.gov.cn/datasearch/data/nmpadata/queryDetail?itemId=ff8080818046502f0180df06de3234d8&id=ffffdbe3ea2a31419920b5baac5fe3f8&timestamp=" + t
headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    'Sign': sign,
    'Timestamp': t,
    'Accept:': "application/json, text/plain, */*",
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Cookie': 'NfBCSins2OywO=60qJrspZ7g91vNAEKk3g_u92Hprl7aQwXy_THb2zjIaKshwziNfzQx85NXO3JzBpcvsvs9I.XpHW3VKX7gyUKJxq; STEP_TIPS_INDEX=true; STEP_TIPS_RESULT=true; NfBCSins2OywP=0Y_KxESgXS0Vb894IY9T7CZ.p1R73hslzmIfStKA2GcF3aIoQrLiWO8YSexvUXzZgmEqXWUshGlfo1QMj8UrtnML7M8d4IEbFAJ6ibJ1dAZDedodxfVVU4SVn1kQaRdoTFukwlb0o5sqZrqvJK.e_MedO74DnF0o1uMX8rc_0PLSnj0uCQtxeaCk8RUo19T0f9aCBwVk_.En8fUtZ44Mr9nR7GKeGYpYaT5QFZZjEQnloWTTBm1GjPTiANceNZPfMjdZaOaSWKbF16XXO6VlxwWZ3uiXAWW6X5bsS0PMq9s767Rv2CbYA_Eb7.9XpT4lE5C4eIyuZWTuYgydppvHMFKtQUTXJuUOgvMmFZeoA8oTwZvP8.0qV3RhHuyzi.sr3V21WFiOkJzBDEiknPPZjwmmXklnItZwFJZBkmUdLvcq; acw_tc=3ccdc16316895572558078521e5b69f1d65008f244bd669ba4a5b3908744bb; token=',
    'Host': 'www.nmpa.gov.cn',
    'Referer': 'https://www.nmpa.gov.cn/datasearch/search-info.html?nmpa=aWQ9ZmZmZmRiZTNlYTJhMzE0MTk5MjBiNWJhYWM1ZmUzZjgmaXRlbUlkPWZmODA4MDgxODA0NjUwMmYwMTgwZGYwNmRlMzIzNGQ4',
    'Sec-Ch-Ua:': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    ''
}

res = requests.get(url=url, headers=headers)
