// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    const totalSalesBox = document.getElementById("totalSalesBox");
    const salesAmount = document.getElementById("salesAmount");

    totalSalesBox.addEventListener("click",()=>{
        fetch('/api/total_sales').then(res => res.json()).then(data=>{
            salesAmount.textContent = `$${data.total_sales.toLocaleString()}`;
        });
    });
});