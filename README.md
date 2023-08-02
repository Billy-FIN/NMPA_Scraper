# NMPA_Scraper
![Static Badge](https://img.shields.io/badge/python-3.7%2B-blue)
![Static Badge](https://img.shields.io/badge/selenium-v4.0+-blue)
![Static Badge](https://img.shields.io/badge/requests-yes!-blue)  
![Static Badge](https://img.shields.io/badge/database-postgreSQL-green)


Note: Only for study!  
Date: 8/2/2023

## Description
  
This web scraping project is designed to extract data and information from China National Medical Products Administration using Requests + JS reverse engineering/Selenium. 

## Config
Three Python modules are necessary for running the code:
```
$ pip install requests
$ pip install selenium
$ pip install fake_useragent
```
Then open ./data_saver_program.

Modify ./data_saver_program/database.ini:
```
[postgresql]
host=your_host
database=your_database
user=your_user
password=your_password
```

Modify ./data_saver_program/config.py:

Substitute the part after "filename=" with your absolut path of database.ini
```
def config(filename='D:\CFDA_web_crawler\data_saver_program\database.ini', section='postgresql'):

```

Modify ./data_saver_program/data_saver.py:

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
