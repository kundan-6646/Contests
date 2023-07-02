let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    renderProducts(products);
  } catch (error) {
    console.log('Error:', error);
  }
  
}
fetchProducts();

const mensSection = document.getElementById('mens');
const womensSection = document.getElementById('womens');
const jewellerySection = document.getElementById('jewellery');
const electronicsSection = document.getElementById('electronics');
function renderProducts(data) {
  //clearing old items first
  womensSection.querySelector('.items').innerHTML = '';
  mensSection.querySelector('.items').innerHTML = '';
  jewellerySection.querySelector('.items').innerHTML = '';
  electronicsSection.querySelector('.items').innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    const div = document.createElement('div');
    div.classList.add('item');
    div.setAttribute('data-id', product.id);
    div.innerHTML = `<img src="${product.image}" alt="Item" />
    <div class="info">
    <div class="title">${product.title.length > 25 ? product.title.substring(0,25) + "..." : product.title}</div>
      <div class="row">
        <div class="price">$${product.price}</div>
        <div class="sized">S,M,L</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color: #000"></div>
          <div class="circle" style="background-color: #4938af"></div>
          <div class="circle" style="background-color: #203d3e"></div>
        </div>
      </div>
      <div class="row">Rating:${product.rating.rate}</div>
    </div>
    <button id="addBtn" onclick="addToCart(this)">Add to Cart</button>`;


    if (product.category.includes('women')) {
      womensSection.querySelector('.items').appendChild(div);
    }else if(product.category.includes('men')) {
      mensSection.querySelector('.items').appendChild(div);
    }else if (product.category.includes('jewelery')) {
      jewellerySection.querySelector('.items').appendChild(div);
    }else {
      electronicsSection.querySelector('.items').appendChild(div);
    }
  }
}

//search prod by keyword
const searchProd = document.getElementById('search-product');
searchProd.addEventListener('input', () => {
  let keyword = searchProd.value.toLowerCase();
  let filtreData = products.filter(product => {
    return product.title.toLowerCase().includes(keyword);
  });

  renderProducts(filtreData);
});

//filter
const allFilters = document.getElementsByClassName('filter');
let lastFilter = "all";
for (let i = 0; i < allFilters.length; i++) {
  const filter = allFilters[i];
  filter.addEventListener('click', (e) => {
    e.currentTarget.classList.add('active');
    document.querySelector('.' + lastFilter).classList.remove('active');
    
    let filterValue = e.currentTarget.innerText.toLowerCase();
    lastFilter = filterValue;
    if(filterValue == 'all') {
      mensSection.style.display = 'block';
      womensSection.style.display = 'block';
      jewellerySection.style.display = 'block';
      electronicsSection.style.display = 'block';

      return;
    }

    mensSection.style.display = 'none';
    womensSection.style.display = 'none';
    jewellerySection.style.display = 'none';
    electronicsSection.style.display = 'none';

    if(filterValue == 'mens') mensSection.style.display = 'block';
    else if(filterValue == 'womens') womensSection.style.display = 'block';
    else if(filterValue == "jewellery") jewellerySection.style.display = 'block';
    else electronicsSection.style.display = 'block';
  });
}