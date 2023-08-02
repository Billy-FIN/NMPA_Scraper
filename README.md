# NMPA_Scraper
![Static Badge](https://img.shields.io/badge/python-3.7%2B-blue)
![Static Badge](https://img.shields.io/badge/selenium-v4.0+-blue)
![Static Badge](https://img.shields.io/badge/requests-yes!-blue)  
![Static Badge](https://img.shields.io/badge/database-postgreSQL-green)


Note: Only for study!  
Date: 8/2/2023

## Content
- [Description](#desc)
- [Config](#config)
- [Guidelines](#guidelines)

<span id="desc"></span>
## Description
This web scraping project is designed to extract data and information from China National Medical Products Administration using Requests + JS reverse engineering/Selenium. 

<span id="config"></span>
## Config
Three Python modules are necessary for running the code:
```
$ pip install requests
$ pip install selenium
$ pip install fake_useragent
```

Then open .\data_saver_program.

Modify .\data_saver_program\database.ini:
```
[postgresql]
host=your_host
database=your_database
user=your_user
password=your_password
```

Modify .\data_saver_program\config.py:

Substitute the part after "filename=" with your absolute path of database.ini
```
def config(filename='D:\CFDA_web_crawler\data_saver_program\database.ini', section='postgresql'):

```


Modify .\data_saver_program\data_saver.py:

You need to adjust this part of the code in order to store respective data in your table, including the name and headers of the table:
```
self.table_name = "detail_info"
        commands = (
            """
            CREATE TABLE IF NOT EXISTS "public"."detail_info" (
                "data_seq" int,
                "id" text,
	            "registered_id" text,
                "company_name" text,
	            "legal_representative" text,
                "person_in_charge_of_enterprise" text,
                "residence_address" text,
                "business_address" text,
                "business_mode" text,
                "business_scope" text, 
                "storage_address" text,
                "issue_department" text,
                "issue_date" text,
                "exp" text
            );
            """
        )
```

<span id="guidelines"></span>
## Guidelines
-**operation**  
Please first run .\NMPA_search_results_by_requests.py to obtain Id and store them in your table. These Ids are instrumental to obtaining data on respective detailed pages while running .\NMPA_detail_page_by_requests.py

-**resources**  
Important source code (used for JS reversing engineering) are stored in .\resources\important source code. Additionally, .\resources\NMPA_DATA.json has all itemIds. ItemId is the identification code to visit corresponding database. You can also change the itemId in the code and config of data_saver.py to extract data from different databases.

-**log**  
Lost information caused by wrong Id can be found in ./log/information_lost.txt  
Program operating output can be found in ./log/output.txt
