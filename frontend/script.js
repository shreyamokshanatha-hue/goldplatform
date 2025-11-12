// Current gold price per gram
const goldPricePerGram = 5000;

// Gold holdings in grams
const goldHoldings = {
  rings: 10,
  necklace: 20,
  coins: 5
};

// Display gold holdings
const holdingsDiv = document.getElementById("gold-holdings");
let totalValue = 0;

holdingsDiv.innerHTML = "<h2>Gold Holdings:</h2>";
for (const item in goldHoldings) {
  const weight = goldHoldings[item];
  const value = weight * goldPricePerGram;
  totalValue += value;
  holdingsDiv.innerHTML += `<p>${item}: ${weight}g → ₹${value}</p>`;
}

// Display total value
const totalDiv = document.getElementById("total-value");
totalDiv.innerHTML = `<h3>Total Gold Value: ₹${totalValue}</h3>`;
