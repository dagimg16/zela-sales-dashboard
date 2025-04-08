from flask import Flask, render_template, jsonify, request
import sqlite3
import os
from functools import wraps

app = Flask(__name__)

# Database helper functions
def get_db_connection():
    """Create a database connection and return the connection object"""
    conn = sqlite3.connect('zela_nails.sqlite')
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def query_db(query, args=(), one=False):
    """Query the database and return results as dictionaries"""
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute(query, args)
        rv = [dict(row) for row in cur.fetchall()]
        conn.commit()
        return (rv[0] if rv else None) if one else rv
    finally:
        conn.close()

@app.route('/')
def index():
    return render_template('index.html')    

#Example how flas integrate with js    
@app.route('/api/total_sales')
def get_total_sales():
    return jsonify({"total_sales": 25123.75})

@app.route('/api/kpis')
def get_kpis():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT strftime('%m', Date) as Month, SUM("Total sales") as TotalSales
        FROM sales_data 
        WHERE Store = ? 
            AND strftime('%Y', Date) = ? 
            AND strftime('%m', Date) = ? 
         GROUP BY Month
        """
    args = (branch,year, month)
    total_sales = query_db(query,args)

    return jsonify(total_sales)

@app.route('/api/daily-sales')
def get_daily_sales():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT strftime('%d', Date) as Day, SUM("Total sales") as DailySales
        FROM sales_data 
        WHERE Store = ? 
            AND strftime('%Y', Date) = ? 
            AND strftime('%m', Date) = ? 
         GROUP BY Day
        """
    args = (branch,year, month)
    daily_sales = query_db(query,args)
    return jsonify(daily_sales)

@app.route('/api/monthly-sales')
def get_monthly_sales():
    year = request.args.get('year')
    branch = request.args.get('store')

    query = """
        SELECT strftime('%m', Date) as Month, SUM("Total sales") as MonthlySales
        FROM sales_data 
        WHERE Store = ? 
            AND strftime('%Y', Date) = ?  
         GROUP BY Month
        """
    args = (branch,year)
    yearly_sales = query_db(query,args)
    return jsonify(yearly_sales)

@app.route('/api/top-clients')
def get_top_clients():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT Client, SUM("Total sales") as MonthlySales
        FROM sales_data 
        WHERE Store = ? 
            AND strftime('%Y', Date) = ? 
            AND strftime('%m', Date) = ? 
        GROUP BY Client
        ORDER BY MonthlySales DESC
        LIMIT 5 
        """
    args = (branch,year, month)
    top_clients = query_db(query,args)
    return jsonify(top_clients)          

@app.route('/api/top-team-members')
def get_top_team_members():
    return           
 
@app.route('/api/sales-by-category')
def get_sales_by_category():
    return            

 
@app.route('/api/sales-by-channel')
def get_sales_by_channel():
    return            


if __name__ == "__main__":
    app.run(debug = True, port=5002)