// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard JS is now running!");

    const totalSalesBox = document.getElementById("totalSalesBox");
    const salesAmount = document.getElementById("salesAmount");
    const monthlySalesBox = document.getElementById("monthlySales");
    const monthlySalesAmount = document.getElementById("monthlySalesAmount");
    const topMembersBox = document.getElementById("topTeamMembers");
    const topMembersList = document.getElementById("topMembers");
    const topCategoryBox = document.getElementById("topCategorySales");
    const topCategoryList = document.getElementById("topCategory");
    const topChannelBox = document.getElementById("topInfluencingChannel");
    const topChannelList = document.getElementById("topChannel");

    totalSalesBox.addEventListener("click",()=>{
        fetch('/api/total_sales').then(res => res.json()).then(data=>{
            salesAmount.textContent = `$${data.total_sales.toLocaleString()}`;
        });
    });

    monthlySalesBox.addEventListener("click",()=>{
        fetch('/api/top-clients?year=2025&month=03&store=1').then(res => res.json()).then(data=>{
            console.log(data)
            monthlySalesAmount.textContent = `$${data[0].MonthlySales.toLocaleString()}`;
        });
    });

    topMembersBox.addEventListener("click",()=>{
        fetch('/api/top-team-members?year=2025&month=04&store=1').then(res => res.json()).then(data=>{
            console.log(data);
            topMembersList.textContent = data[0]['Team member'];
        });
    });

    topCategoryBox.addEventListener("click",()=>{
        fetch('/api/sales-by-category?year=2025&month=03&store=1').then(res => res.json()).then(data=>{
            console.log(data)
            topCategoryList.textContent = data[0]['Category'];
        });
    });

    topChannelBox.addEventListener("click",()=>{
        fetch('/api/sales-by-channel?year=2025&month=03&store=1').then(res => res.json()).then(data=>{
            console.log(data)
            topChannelList.textContent = data[0]['Channel'];
        });
    });
});

