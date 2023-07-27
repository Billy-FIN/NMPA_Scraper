'''
Used for storing the data

@Author: Qiuyang Wang
@Email: billyfinnn@gmail.com
@Date: 7/25/2023
'''

#!/usr/bin/python
import psycopg2
from datetime import datetime
from data_saver_program.config import config


class data_saver():

    def __init__(self):
        #
        # legal_representative text,
        # person_in_charge_of_enterprise text,
        # residence_address text,
        # business_address text,
        # business_mode text,
        # storage_address text,
        # issue_department text,
        self.table_name = "detail_info"
        commands = (
            """
            CREATE TABLE IF NOT EXISTS "public"."detail_info" (
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
        conn = None
        try:
            # read the connection parameters
            params = config()
            # connect to the PostgreSQL server
            print("Connecting...")
            conn = psycopg2.connect(**params)
            cur = conn.cursor()
            # display the PostgreSQL database server version
            print('PostgreSQL database version: ', end='')
            cur.execute('SELECT version()')
            db_version = cur.fetchone()
            print(db_version)
            # create the table if it doesn't exist
            print("Connection established")
            cur.execute(commands, ())
            # close communication with the PostgreSQL database server
            cur.close()
            # commit the changes
            conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            print("Failed!")
        finally:
            if conn is not None:
                conn.close()

    def run_query(self, query, tpl, flag):
        conn = None
        try:
            params = config()
            conn = psycopg2.connect(**params)
            cur = conn.cursor()
            cur.execute(query, tpl)
            if flag == True:
                data = cur.fetchone()
            else: 
                data = None
            cur.close()
            conn.commit()
            return data
            # print("Completed!")
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()
            # print("Connection closed")

    def copy_data_from_csv(self):
        self.run_query(
            "COPY " + self.table_name + " FROM 'xxx.csv' delimiter ',' csv header", ())

    def insert_data(self, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12):
        # start = time.time()
        # need to adjust this function if the target table changes
        self.run_query(
            "INSERT INTO " + self.table_name + " VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);", (data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12), False)
        # end = time.time()
        # print("写入数据库用时{}秒".format((end - start)))
