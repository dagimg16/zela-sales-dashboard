import pandas as pd
import sqlite3 

#Load the csv into DataFrame
df = pd.read_csv('data/Zela_Nails_Sales_Data.csv')

#Connect to SQLite
conn = sqlite3.connect('zela_nails.sqlite')

#write the DataFrame to SQLite Table
df.to_sql('sales_data', conn, if_exists='replace',index=False)

#Close database connection
conn.close()