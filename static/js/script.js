const monthMap = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
  };

let selectedStore = 1;
let selectedYear = 2025;
let selectedMonth = "04";
let sortby = "Sales"

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard JS is now running!");

    document.getElementById("storeDropDown").addEventListener("change", (e) => {
        storeChanged(e.target.value);
    });

    document.getElementById("yearDropDown").addEventListener("change", (e) => {
        yearChanged(e.target.value);
    });

    document.getElementById("monthDropDown").addEventListener("change", (e) => {
        monthChanged(e.target.value);
    });

    document.getElementById("sortTeamBy").addEventListener("change", (e) => {
        sortbyChanged(e.target.value);
    });

    document.getElementById("modal").addEventListener("click", (e) => {
        if (e.target.id === "modal") {
          document.getElementById("modal").style.display = "none";
        }
      });

    changeFiltersAndDashboard(selectedStore, selectedYear, selectedMonth, sortby);

});

function changeFiltersAndDashboard(store, year, month) {
    selectedStore = store;
    selectedYear = year;
    selectedMonth = month;

    fetch('/api/stores').then(res => res.json()).then(stores => {
        populateStoreDropdown(stores, store)
    });

    fetch(`/api/years?store=${store}`).then(res => res.json()).then(years => {
        const yearList = years.map(obj => obj.years);
        const yearToUse = yearList.includes(year) ? year : yearList[0]
        selectedYear = yearToUse

        populateYearDropdown(yearList, yearToUse);

        return fetch(`/api/months?store=${store}&year=${yearToUse}`);
    })
        .then(res => res.json()).then(months => {
            const monthList = months.map(obj => obj.months);
            const monthToUse = monthList.includes(month) ? month : monthList[0];
            selectedMonth = monthToUse;

            populateMonthDropdown(monthList, monthToUse);

            updateDashboard(selectedStore, selectedYear, selectedMonth, sortby);
        });

}
function populateStoreDropdown(data, defualtStore) {
    const selector = d3.select("#storeDropDown")
    selector.selectAll("option").remove();
    data.forEach((options) => {
        selector.append("option")
            .text(options.store).attr("value", options.store)
            .property("selected", options.store == defualtStore);
    })
}
function populateYearDropdown(data, defualtYear) {
    const selector = d3.select("#yearDropDown")
    selector.selectAll("option").remove();
    data.forEach((options) => {
        selector.append("option")
            .text(options).attr("value", options)
            .property("selected", options == defualtYear)
    })
}
function populateMonthDropdown(data, defualtMonth) {
    const selector = d3.select("#monthDropDown")
    selector.selectAll("option").remove();
    data.forEach((options) => {
        selector.append("option")
            .text(monthMap[options]).attr("value", options)
            .property("selected", options == defualtMonth)
    })
}
function storeChanged(newStore) {
    selectedStore = newStore;
    changeFiltersAndDashboard(newStore, selectedYear, selectedMonth);
}
function yearChanged(newYear) {
    selectedYear = newYear;
    fetch(`/api/months?store=${selectedStore}&year=${newYear}`)
        .then(res => res.json())
        .then(months => {
            const monthList = months.map(obj => obj.months);
            const monthToUse = monthList[0];
            selectedMonth = monthToUse;
            populateMonthDropdown(monthList, monthToUse);
            updateDashboard(selectedStore, selectedYear, selectedMonth, sortby);
        });
}
function monthChanged(newMonth) {
    selectedMonth = newMonth;
    updateDashboard(selectedStore, selectedYear, selectedMonth, sortby);
}
function sortbyChanged(newSortby){
    sortby = newSortby
    updateDashboard(selectedStore, selectedYear, selectedMonth, sortby)
}


function updateDashboard(selectedStore, selectedYear, selectedMonth, sortby) {
    console.log(`selected store is :${selectedStore}`)
    console.log(`selected year is :${selectedYear}`)
    console.log(`selected month is :${selectedMonth}`)

    //Call KPI Metrics Display Function
    displayKpiMetrics(selectedStore, selectedYear, selectedMonth);

     // Line Chart function
    plotLineChart(selectedStore, selectedYear, selectedMonth);

    plotMonthlyChart(selectedStore, selectedYear);

    displayTopTeamMembers(selectedStore, selectedYear, selectedMonth, sortby);

    // Top Clients Table function
    topClientsData(selectedStore, selectedYear, selectedMonth);

    plotSalesbyCategory(selectedStore, selectedYear, selectedMonth);

    // Top Influencing Channel
    displayDoughnutChart(selectedStore, selectedYear, selectedMonth);

    
}
//KIP Metrics Display   
function displayKpiMetrics(selectedStore, selectedYear, selectedMonth){
    fetch(`/api/kpis?store=${selectedStore}&year=${selectedYear}&month=${selectedMonth}`)
        .then(res => res.json())
        .then(kpiMetrics => {
            console.log("fetched KPI data successfully");
            const totalSales = `$${kpiMetrics[0].Total_Sales.toLocaleString(undefined,{
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2  
                                })}`;
            const numberOfSales = kpiMetrics[0].Number_of_Sales.toLocaleString();
            const averageSales =  `$${kpiMetrics[0].Average_Sale_Value.toLocaleString(undefined,{
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                                })}`;

            document.getElementById("salesAmount").textContent = totalSales;
            document.getElementById("numberSales").textContent = numberOfSales;
            document.getElementById("averageSales").textContent = averageSales;
            
        })
        .catch(error => console.error('Error fetching KPI data:', error));
};

function plotLineChart(selectedStore, selectedYear, selectedMonth) {
    fetch(`/api/daily-sales?store=${selectedStore}&year=${selectedYear}&month=${selectedMonth}`)
        .then(res => res.json())
        .then(dailySales => {
            const days = dailySales.map(sale => sale.Day);
            const sales = dailySales.map(sale => sale.DailySales);

            let linechart = [{
                x: days,
                y: sales,
                mode: 'lines+markers',
                type: 'scatter',
                name: 'Daily Sales',
                line: { shape: 'linear'}
            }];

            let linechartlayout = {
                width: 500,
                height: 400,
                // title: `Daily Sales for ${selectedMonth}/${selectedYear} at Store${selectedStore}`,
                xaxis: { title: 'Day'},
                yaxis: { title: 'Sales ($)'}
            };

            Plotly.newPlot("dailySalesChart", linechart, linechartlayout, { responsive: true });
        })
        .catch(error => console.error('Error fetching daily sales:', error));
}

function plotMonthlyChart(selectedStore, selectedYear) {
    fetch(`/api/monthly-sales?store=${selectedStore}&year=${selectedYear}`)
        .then(res => res.json())
        .then(monthlySales =>{
            console.log("fetched monthly sales data successfully");
            const month = monthlySales.map(month => monthMap[month.Month]);
            const sales = monthlySales.map(sales => sales.MonthlySales);
    
            let barchart = [{
                x: month,
                y: sales,
                type: "bar"
            }];

            let barlayout = {
                width: 500,
                height: 400,
                xaxis: { title: 'Month'},
                yaxis: { title: 'Sales ($)'}
            };

            Plotly.newPlot("monthlySalesChart", barchart, barlayout, { responsive: true });
        })
        .catch(error => console.error('Error fetching monthly data sales:', error));

};

function displayTopTeamMembers(selectedStore, selectedYear, selectedMonth, sortby) {
    fetch(`/api/top-team-members?store=${selectedStore}&year=${selectedYear}&month=${selectedMonth}&sort=${sortby}`)
        .then(res => res.json())
        .then(members => {
            console.log("fetched team members data successfully");

            const topMembersBox = document.getElementById("topMembers");
            topMembersBox.innerHTML = "";

            const header = document.createElement("div");
            header.classList.add("team-member", "team-header");
            header.innerHTML = `
                <span class="member-name"><strong>Name</strong></span>
                <span class="member-sales"><strong>Sales</strong></span>
                <span class="member-services"><strong>Services</strong></span>
                `;
            topMembersBox.appendChild(header);

            members.forEach(member => {
                const row = document.createElement("div");
                row.classList.add('team-member');
                row.innerHTML =`
                    <span class="member-name">${member.name}</span>
                    <span clss="member-sales">$${member.Sales.toLocaleString()}</span>
                    <span clss="member-services">${member.Services.toLocaleString()}</span>`;
                topMembersBox.appendChild(row);    
            });

        })
        .catch(error => console.error('Error fetching team members data sales:', error));
}

function topClientsData(selectedStore, selectedYear, selectedMonth){
    fetch(`/api/top-clients?store=${selectedStore}&year=${selectedYear}&month=${selectedMonth}`)
        .then(res => res.json())
        .then(topClients => {
            console.log("Fetched top clients data successfully");

            const topClientsBox = document.getElementById("clientsBox");
            topClientsBox.innerHTML = "";

            topClients.forEach(client => {
                const row = document.createElement("div");
                row.classList.add('client-table');
                row.innerHTML =`
                    <span class="client-name">${client.Client}</span>
                    <span class="client-sales">$${client.MonthlySales.toLocaleString()}</span>`;

                row.addEventListener("click", () => {
                    showClientHistory(client.Client); // pass name to the function
                    });
                topClientsBox.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching top clients data:', error));
}
function showClientHistory(clientName){
    fetch(`/api/client-history?client=${encodeURIComponent(clientName)}`)
        .then(res => res.json())
        .then(visits => {
        if (visits.length === 0) {
            showModal(`${clientName} has no visit history.`);
            return;
        }

        let content = `<h4 style="text-align: center;">Visit History for ${clientName}</h4><ul>`;
        visits.forEach(visit=>{
            content += `
                    <li style="display: flex; justify-content: space-between;">
                        <span class="visit-Date">${visit.Date}</span>
                        <span class="visit-teamMember">${visit.teamMember}</span>
                        <span class="visit-Service">${visit.Service}</span>
                        <span class="visit-Sales">$${visit.sales.toFixed(2)}</span>
                    </li>`;
        });
        content += '</ul';

        showModal(content);

    });  

}
function showModal(html) {
    document.getElementById("modalContent").innerHTML = html;
    document.getElementById("modal").style.display = "block";
  }

function plotSalesbyCategory(selectedStore, selectedYear, selectedMonth){
     fetch(`/api/sales-by-category?store=${selectedStore}&year=${selectedYear}&month=${selectedMonth}`)
     .then(res => res.json())
     .then(categorySales=> {
        console.log("fetched sales-by-category data successfully");
        console.log(categorySales)
        const category = categorySales.map(cat => cat.Category).reverse();
        const sales = categorySales.map(sal => sal.MonthlySales).reverse();

        let barData = [{
            x: sales,
            y: category,
            type : "bar",
            orientation: "h"
          }]
      
          let barlayout = {
            width: 500,
            height: 400
          };
      
          
          Plotly.newPlot("CategorySalesChart", barData, barlayout)



     })
     .catch(error => console.error('Error fetching sales-by-category data:', error));
;
}

async function displayDoughnutChart(selectedStore, selectedYear, selectedMonth) {
    try{
        const response = await fetch(`/api/sales-by-channel?store=${selectedStore}&year=${selectedYear}&month=${selectedMonth}`)

        if(!response.ok){
            throw new Error('network response was not ok: ${response.statusText}');
        }
        const topChannels = await response.json();

        console.log("Fetched top channels data successfully");
        console.log(topChannels);

        const labels = topChannels.map(data => data.Channel);
        const customer_count = topChannels.map(data => data['Customer Count']);
        const totalCustomers = customer_count.reduce((acc, count) => acc + count, 0);

        const ctx = document.getElementById('channelDoughnutChart').getContext('2d');

        let doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sales by Channel',
                    data: customer_count,
                    backgroundColor: [
                        'rgba(135, 206, 250, 0.6)',
                        'rgba(135, 206, 235, 0.6)',
                        'rgba(30, 144, 255, 0.6)',
                        'rgba(100, 149, 237, 0.6)',
                        'rgba(0, 0, 205, 0.6)',
                        'rgba(0, 0, 139, 0.6)'   
                    ],
                    borderColor: 'rgba(21, 20, 20, 0.42)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        // text: 'Channels Influence in Sales'
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(2) + '%';
                            return percentage;
                        },
                        color: '#fff',
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }catch (error){
        console.error('Error fetching channel data:', error);
    }
}