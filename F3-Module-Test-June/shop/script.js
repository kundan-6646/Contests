let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    renderProducts();
  } catch (error) {
    console.log('Error:', error);
  }
  
}
fetchProducts();

const mensSection = document.getElementById('mens');
const womensSection = document.getElementById('womens');
const jewellerySection = document.getElementById('jewellery');
const electronicsSection = document.getElementById('electronics');
function renderProducts() {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const div = document.createElement('div');
    div.classList.add('item');
    div.setAttribute('data-id', product.id);
    div.innerHTML = `<img src="${product.image}" alt="Item" />
    <div class="info">
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