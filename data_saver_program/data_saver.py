'''
Used for storing the data

@Author: Qiuyang Wang
@Email: billyfinnn@gmail.com
@Date: 7/31/2023
'''

#!/usr/bin/python
import psycopg2
from data_saver_program.config import config


class data_saver():

    def __init__(self):
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
        
        # self.table_name = "company_overview_test"
        # commands = (
        #     """
        #     CREATE TABLE IF NOT EXISTS "public"."company_overview_test" (
        #         "data_seq" int,
	    #         "registered_id" text,
        #         "company_name" text,
	    #         "company_id" text
        #     );
        #     """
        # )
        
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
            print("Connection established")
            # create the table if it doesn't exist
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

    def run_query(self, query, tpl, flag=False):
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