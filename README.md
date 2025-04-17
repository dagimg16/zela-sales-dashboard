# Project Title: Sales & Customer Analytics Dashboard for Zela Nails and Salon
     
## Project Overview
     
This project aims to develop an interactive, data-driven dashboard for Zela Nails and Salon, a premier beauty service provider with two locations. The Dashboard will give the business real-time insights into sales performance, customer behavior, team productivity, and booking trends. Visualized key performance indicators (KPIs) and data will help the business owners make future decisions and plan strategically.
      
## Usage and installation instructions
     
To run the Zela Nails Dashboard locally, follow these steps:    
     
#### 1. Clone the Repository    

To clone the repository into our local machine, type the following code in your terminal/bash: 
```
git clone https://github.com/dagimg16/zela-sales-dashboard
```
Then change into the folder, using the following command:
```
cd zela-sales-dashboard
```
                      
#### 2. Install Dependencies     
            
Python: Ensure you have Python installed (version 3.7 or higher)
     
Libraries: Install the required libraries using pip:
```
pip install Flask
pip install pandas
pip install matplotlib
pip install seaborn
pip install numpy
pip install scikit-learn
```
      
All required dependencies are listed in the **requirements.txt** file. You can either install them individually or use the following command to install all at once:
```
pip install -r requirements.txt
```
            
In your Flask application, you will need to include the following imports at the beginning of your Python script:
```    
from flask import Flask, render_template, jsonify, request
import sqlite3
import os
from functools import wraps
```

|Function/ Library	|Description|
|-----------------	|-----------|
|**Flask** 		|The main class for creating a Flask web application.|
|**render_template** 	|A function to render HTML templates.|
|**jsonify**	 	|A function to convert Python dictionaries to JSON format for API responses.|
|**request** 		|An object to handle incoming request data.|
|**sqlite3** 		|A library for interacting with SQLite databases.|
|**os** 		|A module for interacting with the operating system, useful for file path management.|
|**wraps** 		|A decorator from the functools module that helps preserve the metadata of the original function when creating decorators.|

	
#### 3. Frontend Libraries
       
* **Bootstrap**: A front-end framework for responsive and mobile-first web design.
* **Chart.js**: A JavaScript library for creating interactive and animated charts.
* **Chart.js Plugin** for Data labels: An extension that displays data values directly on charts.
* **D3.js**: A powerful library for manipulating documents based on data for complex visualizations.
* **Plotly**: A library for creating interactive graphs and advanced data visualizations.


#### 4. Run the Application:

Launch the Visual Studio Code (VSCode) application and open the cloned project folder.    
      
Open the terminal/bash within VSCode and run the following command to start the Flask server:
```
python app.py
```
Once the server is running, click on the URL link to access the dashboard, or open your web browser and navigate to the following URL:**http://127.0.0.1:5000**


## Project goals
     
The primary business question addressed by this dashboard is: **“How can we optimize our services and increase sales at Zela Nails and Salon?”**     

To achieve this, the dashboard is designed with the following key features:
+ Real-time performance monitoring: Provide an up-to-date view of business performance for each store location.
+ Dynamic filtering options: Allows users to filter data by year, month, and store branch, facilitating comparisons and analyses across different time periods and locations.
+ Interactive Visualizations: Display key sales KPIs and trends through engaging charts and tables, making data interpretation user-friendly and accessible.
+ Employee and Client insights: Identifies top-performing employees and clients, helping to recognize contributions and foster relationships.
+ Appointment Channel Analysis: Analyses appointment booking channels and sales by service categories, providing insights into customer preferences and service performance.
     
## Data pre-processing/gathering steps
     
Data is collected from the sales records of Zela Nails and Salon. The following steps are undertaken to clean and manipulate the data:
        
Data Collection: Gather data from the CSV file contaaining sales records.   
Data Cleaning: Remove duplicates, address handle missing values, and standardize data formats to ensure consistency and accuracy.    
Data Transformation: Transform the raw data into a structured SQLite format, which facilitates efficient querying and analysis.



## Analysis to support the visuals and findings

The analysis focuses on calculating key metrics, including total sales,  average sale value, and number of services. These metrics are essential for understanding business performance. This resulting data is then visualized using line charts, bar charts, and doughnut charts to provide clear insights into performance trends and facilitating data-driven decision making.

### Visuals and explanations 

•	KPI Boxes: Display total sales, number of services, and average sale value.

<img width="782" alt="Screenshot 2025-04-17 at 11 26 12 AM" src="https://github.com/user-attachments/assets/f7e7960d-0521-41f1-80db-4e82d90f2b37" />

•	Sales Charts: Daily and monthly sales trends visualizing using line and bar charts.
•	Top members and Clients: Lists of top-performing team members and clients.
•	Doughnut Chart: Visual representation of appoinments by channel.
•	Category Sales chart: Breakdown of sales by service category.

## Additional explanations
       
The dashboard is built using HTML, CSS, and JavaScript, leveraging libraries such as Bootstrap for styling and Chart.js and plotly for data visualization. The application is designed to be responsive and user- friendly.
           
|Layer	        |Technology|
|---------------|----------|
|Frontend	|HTML, CSS, JavaScript, Plotly.js / Chart.js|
|Backend	|Flask   (Python)|
|Database	|SQLite|
|Data Source	|Zela Nails & Salon sales data|

## Major findings
      
Peak sales period?
Highest and lowest sales.
Top clients contributing to revenue
	
## Limitations and Future Development
      
#### Data limitations 
The analysis is subject to certain data limitations, including:
- Workload and Scheduling: We lack comprehensive data on employee workloads and schedules, which affects our ability to assess overbooking or underbooking situations.
- Client Spending Behavior: Insufficient data on client spending behavior limits our understanding of customer preferences and financial capacity.
- Employee Status: The system does not differentiate between current and former employees, which restricts our ability to create fully dynamic analyses.

#### Future enhancements
To address these limitations, several enhancements are planned for future development:
- Enhanced Data Collection: Implementing systems to capture detailed workload and scheduling information to better analyze booking patterns.
- Client Insights: Gathering more comprehensive data on client spending behavior to inform marketing strategies and service offerings.
- Dynamic Employee Analysis: Developing a system that accurately tracks current and former employees to enable more dynamic reporting and analysis.
- Risk Analysis: Incorporating team member risk analysis into future calculations to better understand potential impacts on service delivery and performance.

These enhancements will help improve the accuracy and depth of our analysis, ultimately leading to more informed decision-making.


## Conclusion   
     
In summary, this dashboard serves as a vital tool for Zela Nails, addressing the key business question of how to optimize services and increase sales. Through comprehensive data collection and analysis, we have calculated essential metrics such as total sales, average sale value, and service counts, which are visualized using interactive charts to reveal performance trends.      
         
While the current analysis provides valuable insights, it is important to acknowledge certain limitations, including gaps in data related to employee workloads, client spending behavior, and the differentiation between current and former employees. These limitations highlight the need for enhanced data collection and analysis methods in the future.

Looking ahead, the proposed enhancements aim to address these gaps by implementing systems for better workload tracking, gathering more detailed client insights, and developing dynamic employee analysis capabilities. By continuously improving our data processes and analysis techniques, we can further empower the Zela Nails team to make informed, data-driven decisions that enhance service offerings and drive sales growth.      
      
## References   

Our Instructor, Tuncay E. Dogan, provided great assistance in completing this project. He shared many helpful website links to explore new ideas in data visualization and improve our coding skills.   

Various internet sites such as Stack Overflow, GeeksForGeeks, and others were also helpful in times of error encounters and code generation.    

Other documentation references:   
      
Bootstrap Documentation: https://getbootstrap.com/     
Chart.js Documentation: https://www.chartjs.org/     
Flask Documentation: https://flask.palletsprojects.com/en/stable/     
Plotly Documentation: https://plotly.com/javascript/     



### Team Members

- Dagim Girma: Database/Backend
- Francisco Gonzalez: Frontend
- Tiya Francy: Backend


