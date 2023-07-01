// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

if(!localStorage.getItem("users")) {
    const userArr = [];
    localStorage.setItem("users", JSON.stringify({userArr}));
}

if(!localStorage.getItem("loggedInUser")) {
    localStorage.setItem("loggedInUser", JSON.stringify({}));
}
