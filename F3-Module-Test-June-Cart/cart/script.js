const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const productContainer = document.getElementsByClassName('products')[0];

const checkoutDiv = document.getElementsByClassName('checkout-items')[0];
const totalCont = document.getElementsByClassName('total-amout')[0];

function renderProducts(data) {

    productContainer.innerHTML = '';
  
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      const div = document.createElement('div');
      div.classList.add('card');
      div.setAttribute('data-id', product.id);
      div.innerHTML = `<img src="${product.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title.length > 25 ? product.title.substring(0,25) + "..." : product.title}</h5>
        <p class="card-text">${product.description.length > 50 ? product.description.substring(0,50) + "..." : product.description}</p>
        <div class="price">Price: $${product.price}</div>
        <a href="#" class="btn btn-dark" onclick="removeFromCart(this)">Remove From Cart</a>
      </div>`;

      productContainer.appendChild(div);
    }

    calculateTotalPrice(data);
}

renderProducts(loggedInUser.cart);


//this func renders items in checkout list with total
function calculateTotalPrice(data) {
    checkoutDiv.innerHTML = '';
    let price = 0;

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        let div = document.createElement('div');
        div.classList.add('checkout-item');
        div.innerHTML = `<div>${product.title.length > 25 ? product.title.substring(0,25) + "..." : product.title}</div>
        <div>$${product.price}</div>`

        price += Math.floor(product.price)

        checkoutDiv.appendChild(div);
    }

    totalCont.innerHTML = '$ ' + price;
}


function removeFromCart(e) {
    let productId = e.parentElement.parentElement.getAttribute('data-id');
    let products = loggedInUser.cart;

  
    //removing curr product from user cart
    let filteredCart = [];
    let found = false;
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if(element.id == productId && !found) {
            found = true;
            continue;
        }

        filteredCart.push(element);
    }
    

    e.remove();
    loggedInUser.cart = filteredCart;
    renderProducts(filteredCart);
    updateDataInLocal(loggedInUser);
}

function updateDataInLocal(user) {
    const userArr = JSON.parse(localStorage.getItem("users")).userArr;
    for (let i = 0; i < userArr.length; i++) {
        const currUser = userArr[i];
        if(currUser.id == user.id) {
            userArr[i] = {...user};
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify({userArr}));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Removed from cart!");
  }