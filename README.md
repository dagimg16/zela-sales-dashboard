# Project Title: Sales & Customer Analytics Dashboard for Zela Nails and Salon
     
## Project Overview
     
This project aims to develop an interactive, data-driven dashboard for Zela Nails and Salon, a premier beauty service provider with two locations. The Dashboard will give the business real-time insights into sales performance, customer behavior, team productivity, and booking trends. Visualized key performance indicators (KPIs) and data will help the business owners make future decisions and plan strategically.
      
## Usage & Installation Instructions
     
### Prerequisites

- Python 3.10+
- SQLite (data is stored locally)

### Installation

Clone the repo and run:

```bash
pip install -r requirements.txt
```

### Start the App

```bash
flask run
```
Then visit: `http://127.0.0.1:5000/`
---

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

![Screenshot 2025-04-17 at 1 58 25 PM](https://github.com/user-attachments/assets/fe19ef0b-b5a9-4458-aed8-4d32ab46a9e3)


•	Sales Charts: Daily and monthly sales trends visualizing using line and bar charts.

![Screenshot 2025-04-17 at 2 05 18 PM](https://github.com/user-attachments/assets/2c01b99d-b56c-4f3a-8a65-d9a352c3976e)



•	Top members and Clients: Lists of top-performing team members and clients with a pop-up client history.

•	Doughnut Chart: Visual representation of appoinments by channel.

![Screenshot 2025-04-17 at 1 59 03 PM](https://github.com/user-attachments/assets/a00a0f0b-ae8e-436e-bd90-9b29e0a4741a)

![Screenshot 2025-04-17 at 2 14 35 PM](https://github.com/user-attachments/assets/8073a1ca-c5b6-4676-805f-988246971993)



•	Category Sales chart: Breakdown of sales by services.

•	Team member risk monitor 


![Screenshot 2025-04-17 at 2 11 53 PM](https://github.com/user-attachments/assets/04c3a6d5-3f57-4bc5-8a94-e1f2471f686e)



## Additional explanations
       
The dashboard is built using HTML, CSS, and JavaScript, leveraging libraries such as Bootstrap for styling and Chart.js and plotly for data visualization. The application is designed to be responsive and user- friendly.
           
|Layer	        |Technology|
|---------------|----------|
|Frontend	|HTML, CSS, JavaScript, Plotly.js / Chart.js|
|Backend	|Flask   (Python)|
|Database	|SQLite|
|Data Source	|Zela Nails & Salon sales data|


In addition to the core functionalities of the dashboard, we have integrated a **free Google Review widget** into the project. This widget allows users to display and manage customer reviews directly on the dashboard, providing valuable social proof and enhancing customer engagement. By showcasing real-time feedback from clients, Zela Nails can better understand customer satisfaction and make informed decisions to improve services.

<img width="1327" alt="Screenshot 2025-04-17 at 11 30 35 AM" src="https://github.com/user-attachments/assets/05e5286e-0e7a-43f3-9789-d41f2a0a5a92" />


## Major findings
      
      
##### Peak Sales Period

The analysis indicates that Zela Nails and Salon experiences peak sales on Fridays and Saturdays. This trend suggests that customers prefer to book their beauty services on weekends, likely due to work commitments during the week and social events occurring on weekends. By understanding this pattern, the salon can optimize staffing and inventory levels to effectively meet the increased demand during these busy periods.

##### Sales Performance

In 2023, the highest sales were recorded in December, coinciding with the holiday season when customers are more inclined to indulge in beauty services. June and August also saw elevated sales, likely related to the school year’s closing and opening. Conversely, January and February experienced the lowest sales, indicating a potential seasonal dip.          
           
In 2024, sales remained consistent throughout the year; however, a significant drop occurred in August and September due to employee departures. After addressing staffing issues, the salon rebounded and achieved its highest sales of the year in October.         
          
These insights can inform marketing strategies, such as offering discounts on weekdays or launching promotional campaigns during slower months to boost sales.

##### Employee Performance

      
The dashboard identified top-performing employees based on sales generated and the number of services provided. Recognizing these individuals not only boosts morale but also offers an opportunity to analyze their techniques and customer interaction styles, which can be shared as best practices across the team.    
      
From the team member risk monitor, we can identify those who are highly skilled and may require additional support to ensure their satisfaction. Offering incentives or bonuses can maintain high performance, reduce turnover, and encourage all team members to strive for excellence by highlighting the rewards available. Additionally, training new team members in these best practices can help prevent potential staff departures, safeguarding the business's stability and success.

##### Appointment Channel Analysis
     
All sales in 2023 were conducted through walk-ins or offline channels. Online services, including Instagram, the "Book Now" link, and bookings through the Fresha app, were introduced in 2024.    
     
Despite over 40% of appointments still being made through offline channels, Instagram has demonstrated consistent growth, particularly in 2025, indicating that marketing efforts on social media are effectively reaching customers. Additionally, the "Book Now" link and Fresha app are utilized by customers from these social media platforms to book their appointments.    
     
     
	
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


