// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    const totalSalesBox = document.getElementById("totalSalesBox");
    const salesAmount = document.getElementById("salesAmount");
    const monthlySalesBox = document.getElementById("monthlySales");
    const monthlySalesAmount = document.getElementById("monthlySalesAmount");

    totalSalesBox.addEventListener("click",()=>{
        fetch('/api/total_sales').then(res => res.json()).then(data=>{
            salesAmount.textContent = `$${data.total_sales.toLocaleString()}`;
        });
    });

    monthlySalesBox.addEventListener("click",()=>{
        fetch('/api/kpis?year=2025&month=04&store=1').then(res => res.json()).then(data=>{
            console.log(data)
            monthlySalesAmount.textContent = `$${data[0].TotalSales.toLocaleString()}`;
        });
    });


});

