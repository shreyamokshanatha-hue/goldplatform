// script.js

// ----- GOLD PRICE -----
// For demo: static gold price per gram in INR (24K)
let goldPricePerGram = 12551; // approximate current gold price

// ----- DOM ELEMENTS -----
const livePriceDiv = document.getElementById("live-price");
const holdingsTableBody = document.querySelector("#holdings-table tbody");
const totalValueDiv = document.getElementById("total-value");
const transactionForm = document.getElementById("transaction-form");

// Chart.js elements
const ctx = document.getElementById("holdingsChart").getContext("2d");
let chart;

// ----- HOLDINGS DATA -----
let holdings = {}; // e.g., { rings: 10, necklace: 20 }

// ----- FUNCTIONS -----

// Update live gold price display
function updateLivePrice() {
  livePriceDiv.textContent = `₹ ${goldPricePerGram.toLocaleString("en-IN")}`;
}

// Render holdings table and total value
function renderHoldings() {
  holdingsTableBody.innerHTML = "";
  let totalValue = 0;

  for (const item in holdings) {
    const weight = holdings[item];
    const value = weight * goldPricePerGram;
    totalValue += value;

    const row = document.createElement("tr");
    row.innerHTML = `<td>${item}</td><td>${weight.toFixed(2)}</td><td>₹ ${value.toLocaleString("en-IN")}</td>`;
    holdingsTableBody.appendChild(row);
  }

  totalValueDiv.textContent = `₹ ${totalValue.toLocaleString("en-IN")}`;

  // Update pie chart after table
  updateChart();
}

// Handle form submission
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = document.getElementById("item-name").value.trim();
  const weight = parseFloat(document.getElementById("item-weight").value);
  const type = document.getElementById("transaction-type").value;

  if (!item || isNaN(weight) || weight <= 0) {
    alert("Please enter valid data.");
    return;
  }

  // Initialize item if not present
  if (!holdings[item]) holdings[item] = 0;

  // Add or subtract based on transaction type
  if (type === "purchase") {
    holdings[item] += weight;
  } else {
    holdings[item] -= weight;
    if (holdings[item] < 0) holdings[item] = 0;
  }

  // Re-render table and chart
  renderHoldings();

  // Reset form
  transactionForm.reset();
});

// Update pie chart visualization
function updateChart() {
  const labels = Object.keys(holdings);
  const data = labels.map(item => holdings[item] * goldPricePerGram);

  if (chart) chart.destroy(); // destroy previous chart if exists

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map(() => '#' + Math.floor(Math.random()*16777215).toString(16))
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right' }
      }
    }
  });
}

// ----- INITIAL RENDER -----
updateLivePrice();
renderHoldings();
