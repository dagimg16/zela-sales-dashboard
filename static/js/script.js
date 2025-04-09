
let selectedStore = 1;
let selectedYear = 2025;
let selectedMonth = "04";

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

    changeFiltersAndDashboard(selectedStore, selectedYear, selectedMonth);

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

            updateDashboard(selectedStore, selectedYear, selectedMonth);
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
            .text(options).attr("value", options)
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
            updateDashboard(selectedStore, selectedYear, selectedMonth);
        });
}
function monthChanged(newMonth) {
    selectedMonth = newMonth;
    updateDashboard(selectedStore, selectedYear, selectedMonth);
}
function updateDashboard(selectedStore, selectedYear, selectedMonth) {
    console.log(`selected store is :${selectedStore}`)
    console.log(`selected year is :${selectedYear}`)
    console.log(`selected month is :${selectedMonth}`)
}