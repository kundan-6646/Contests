
//fetch data from an api using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        marketData = data
        addDataToUI(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
}
  
fetchDataWithThen();

//fetch data from an api using async await.
async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
// fetchDataWithAsyncAwait();


//this functions creates tr when data is fetched from API
let marketData = [];
const tableBody = document.querySelector('tbody');
function addDataToUI(data) {
    marketData = data;
    data.forEach(d => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td><img src="${d.image}"</td>
        <td class="t-name">${d.name}</td>
        <td class="t-symbol">${d.symbol.toUpperCase()}</td>
        <td>$${d.current_price}</td>
        <td>$${d.total_volume}</td>
        <td class=${d.price_change_percentage_24h < 0 ? 'negative':'positive'}>${d.price_change_percentage_24h.toFixed(2)}%</td>
        <td>Mkt Cap: $${d.market_cap}</td>`;

        tableBody.appendChild(tr);
    });
}

setTimeout(()=> {
    console.log(marketData);
}, 2000);

//sort by Percentage
function sortDataByPercentage() {
  marketData.sort(function(a, b) {
    return a.price_change_percentage_24h - b.price_change_percentage_24h;
  });
  tableBody.innerHTML = '';
  addDataToUI(marketData);
}


//sort by MktCap
function sortDataByMktCap() {
  marketData.sort(function(a, b) {
    return a.market_cap - b.market_cap;
  });
  tableBody.innerHTML = '';
  addDataToUI(marketData);
}


// search By Keyword function
function searchByKeyword(keyword) {
  keyword = keyword.trim().toLowerCase();
  const rows = tableBody.querySelectorAll("tr");
  
  rows.forEach(row => {
      let name = row.querySelector(".t-name").innerText.trim().toLowerCase();
      let symbol = row.querySelector(".t-symbol").innerText.trim().toLowerCase();
      
      if(name.includes(keyword) || symbol.includes(keyword)) {
          row.style.display = 'table-row';
      }else {
          row.style.display = 'none'
      }
  });
}
  