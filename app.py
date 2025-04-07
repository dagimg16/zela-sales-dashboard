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
    return

@app.route('/api/daily-sales')
def get_daily_sales():
    return

@app.route('/api/monthly-sales')
def get_monthly_sales():
    return 

@app.route('/api/top-clients')
def get_top_clients():
    return            

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
    app.run(debug = True)