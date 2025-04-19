from flask import Flask, render_template, jsonify, request
from collections import defaultdict
import statistics
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

@app.route('/api/stores')
def get_store_number():
    query = "SELECT DISTINCT Store as store FROM sales_data;"
    store_number = query_db(query)
    return jsonify(store_number)

@app.route('/api/years')
def get_years():
    branch = request.args.get('store')
    query = """
            SELECT DISTINCT strftime('%Y', Date) as years
            FROM sales_data 
            WHERE Store = ?
        """
    args = (branch,)
    years= query_db(query, args)
    return jsonify(years)

@app.route('/api/months')
def get_months():
    year = request.args.get('year')
    branch = request.args.get('store')
    query = """
            SELECT DISTINCT strftime('%m', Date) as months
            FROM sales_data 
            WHERE Store = ?
                AND strftime('%Y', Date) = ?
        """
    args = (branch, year)
    months= query_db(query, args)
    return jsonify(months)

@app.route('/api/kpis')
def get_kpis():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT strftime('%m', Date) as Month, 
        SUM("Total sales") as totalSales, 
        COUNT(DISTINCT ("Sale no.")) as numSales,
        ROUND(SUM("Total sales") * 1.0 / COUNT(DISTINCT "Sale no."), 2) AS avgSales
        FROM sales_data 
        WHERE Store = ? 
            AND strftime('%Y', Date) = ? 
            AND strftime('%m', Date) = ? 
        GROUP BY Month
        """
    args = (branch,year, month)
    current_data = query_db(query, args, one=True)

    prev_year = str(int(year) - 1)
    args_prev = (branch, prev_year, month)
    prev_data = query_db(query, args_prev, one=True)

    if not prev_data:
        prev_data = {'totalSales': 0, 'numSales': 0, 'avgSales': 0}

    def percent_change(current, previous):
            return round(((current - previous) / previous) * 100, 2) if previous != 0 else None
    
    response = {
        "current": current_data,
        "change": {
            "totalSales": percent_change(current_data['totalSales'], prev_data['totalSales']),
            "numSales": percent_change(current_data['numSales'], prev_data['numSales']),
            "salesPerCustomer": percent_change(current_data['avgSales'], prev_data['avgSales'])
        }
    }

    return jsonify(response)

@app.route('/api/daily-sales')
def get_daily_sales():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT strftime('%d', Date) as Day, SUM("Total sales") as DailySales,
        COUNT(DISTINCT "Team member") AS TeamMembersWorked
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
        LIMIT 10
        """
    args = (branch,year, month)
    top_clients = query_db(query,args)
    return jsonify(top_clients)          

@app.route('/api/top-team-members')
def get_top_team_members():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')
    sort_column = request.args.get('sort')
   
    query = f"""
    SELECT "Team member" as name, SUM("Total sales") as Sales, COUNT(DISTINCT ("Sale no.")) as Services
    FROM sales_data 
    WHERE Store = ? 
        AND strftime('%Y', Date) = ? 
        AND strftime('%m', Date) = ? 
    GROUP BY "Team member"
    ORDER BY {sort_column} DESC
    LIMIT 10
    """
    args= (branch,year, month)
    top_members = query_db(query, args)
    return  jsonify(top_members)      
 
@app.route('/api/sales-by-category')
def get_sales_by_category():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT Category, SUM("Total sales") as MonthlySales
        FROM sales_data
        WHERE Store = ?
            AND strftime('%Y', Date) = ?
            AND strftime('%m', Date) = ?
        GROUP BY Category
        ORDER BY MonthlySales DESC
        LIMIT 10
        """
    args= (branch,year, month)
    category_sales = query_db(query, args)
    return  jsonify(category_sales)           

@app.route('/api/client-history')
def client_history():
    client = request.args.get('client')

    query = """
    SELECT strftime('%Y-%m-%d', Date) as Date, "Team member" as teamMember, Category as Service, "Total sales" as sales
    FROM sales_data
    WHERE Client = ?
    ORDER BY Date DESC
    """
    args= (client,)
    clientHistory = query_db(query, args)
    return jsonify(clientHistory)
 
@app.route('/api/sales-by-channel')
def get_sales_by_channel():
    year = request.args.get('year')
    month = request.args.get('month')
    branch = request.args.get('store')

    query = """
        SELECT Channel, COUNT(DISTINCT ("Sale no.")) as "Customer Count"
        FROM sales_data
        WHERE Store = ?
            AND strftime('%Y', Date) = ?
            AND strftime('%m', Date) = ?
        GROUP BY Channel
        ORDER BY "Customer Count" DESC
        """
    args= (branch,year, month)
    channel_sales = query_db(query, args)
    return  jsonify(channel_sales) 
                 
@app.route("/api/team-risk")
def get_team_risk():
    year = request.args.get('year')
    month = request.args.get('month')                                             
    year_month = f"{year}-{month}"

    retantion_query = """
    SELECT 
        "Team member" AS teamMember,
        COUNT(*) AS totalAppointments,
        COUNT(DISTINCT Client) AS uniqueClients
        FROM sales_data
        WHERE Store = ?
         AND strftime('%Y-%m', Date) <= ?
         AND "Team member" NOT IN (
        'Bris', 'Evelyn','Hadel','Mary','Favi',
        'XImena','Anahi','Adalu','Karla','Rocio','Lily', 'Celeste')
        GROUP BY "Team member"
    """
    args= (1,year_month)
    retention_data = query_db(retantion_query,args)

    trend_query = """
        SELECT 
        "Team member",
        strftime('%Y-%m', Date) AS month,
        COUNT(*) AS serviceCount
        FROM sales_data
        WHERE Store = ?
        AND strftime('%Y-%m', Date) <= ?
        AND "Team member" NOT IN (
        'Bris', 'Evelyn','Hadel','Mary','Favi',
        'XImena','Anahi','Adalu','Karla','Rocio','Lily', 'Celeste')
        GROUP BY "Team member", month
    """
    args2= (1,year_month)
    trend_data = query_db(trend_query,args2)

    category_query = """
        SELECT 
        "Team member",
        Category,
        COUNT(*) AS serviceCount
        FROM sales_data
        WHERE Store = ?
         AND "Team member" NOT IN (
        'Bris', 'Evelyn','Hadel','Mary','Favi',
        'XImena','Anahi','Adalu','Karla','Rocio','Lily', 'Celeste')
        GROUP BY "Team member", Category
    """
    args3= (1,)
    category_data = query_db(category_query, args3)

    service_summary = defaultdict(lambda: {"total": 0, "mani_pedi": 0})
    service_trend = defaultdict(list)
    for row in trend_data:
            service_trend[row["Team member"]].append((row["month"], row["serviceCount"]))

    for row in category_data:
        name = row["Team member"]
        category = row["Category"]
        count = row["serviceCount"]

        service_summary[name]["total"] += count
        if category == "Manicure / Pedicure":
            service_summary[name]["mani_pedi"] += count

    risk_report = []

    #For each member analyze retention ratio, monthly drop, 
    for member in retention_data:
        name = member["teamMember"]
        total = member["totalAppointments"]
        unique = member["uniqueClients"]
        retention = round(total / unique, 2) if unique else 0
        
        # Get trend data for this person
        history = sorted(service_trend[name], key=lambda x: x[0])
        last_month = history[-1][1] if history else 0
        avg_volume = round(statistics.mean([h[1] for h in history[:-1]]), 2) if len(history) > 1 else last_month
        drop_pct = round(((avg_volume - last_month) / avg_volume) * 100, 1) if avg_volume else 0

        # Category Manicure/Pedicure ratio
        mani_ratio = 0
        if name in service_summary and service_summary[name]["total"] > 0:
            mani_ratio = service_summary[name]["mani_pedi"] / service_summary[name]["total"]

        # Risk score
        score = 0
        if retention < 2.0 or retention > 2.6:
            score += 1
        if drop_pct > 30: score += 1
        if mani_ratio > 0.5: score += 1
        if avg_volume > 300: score += 1

        level = "High" if score >= 3 else "Medium" if score >= 1 else "Low"

        risk_report.append({
            "teamMember": name,
            "retentionRatio": retention,
            "monthlyDrop": drop_pct,
            "maniPediRatio": round(mani_ratio * 100, 2),
            "avgMonthlySalesVolume": avg_volume,
            "riskScore": score,
            "riskLevel": level
        })
    return jsonify(risk_report)

if __name__ == "__main__":
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode)