// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let totalAmount = 0;
for (let i = 0; i < loggedInUser.cart.length; i++) {
  const element = loggedInUser.cart[i];
  totalAmount += Math.floor(element.price)
}
document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_eAynmdt3qu3pEq", // Enter the Key ID generated from the Dashboard
    amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "USD",
    name: "MeShop. Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
  makeCartEmpty();
};


function makeCartEmpty(e) {
  loggedInUser.cart = [];
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
}
