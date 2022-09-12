const arr = [];

const loadProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      arr.push(data);
      showProducts(data);
    });
};

loadProducts("https://fakestoreapi.com/products");

// show all product in UI
const showProducts = (products) => {
  setInnerText("total_products", products.length);
  console.log(products);

  document.getElementById("all-products").innerHTML = "";

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product d-flex flex-column align-items-center ">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h4>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h3>Price: $ ${product.price}</h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 w-75 rounded-2 mt-auto">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-75 rounded-2 bg-main py-2 ">Add to cart</button>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;

const addToCart = (id, price) => {
  count = count + 1;
  updatePrice(id, price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const showProductDetails = (product_id) => {
  fetch(`https://fakestoreapi.com/products/${product_id}`)
    .then((res) => res.json())
    .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
  setInnerText("exampleModalLabel", product_details.title);
  setInnerText("product_Id", product_details.id);
  setInnerText("modal_body", product_details.description);
  setInnerText("rating", product_details.rating.rate);
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;

  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue("price");
  const convertPrice = parseFloat(value);
  const total = parseFloat(convertedOldPrice + convertPrice).toFixed(2);
  document.getElementById("price").innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};
//clear Inner Text function
const clearInnerText = (id) => {
  document.getElementById(id).innerText = "";
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = (
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax")
  ).toFixed(2);
  console.log(getInputValue("price"));
  console.log(getInputValue("delivery-charge"));
  console.log(getInputValue("total-tax"));
  document.getElementById("total").innerText = grandTotal;
  console.log(grandTotal);
};

// search by category
document.getElementById("search-btn").addEventListener("click", function () {
  const inputField = document.getElementById("input-value").value;
  console.log(inputField);
  console.log(arr);
  const searchedProduct = arr[0].filter(
    (p) => p.category.toLowerCase().indexOf(inputField) > -1
  );
  console.log(arr);
  showProducts(searchedProduct);
});
const modalCloseHandler = () => {
  clearInnerText("exampleModalLabel");
  clearInnerText("product_Id");
  clearInnerText("modal_body");
  clearInnerText("rating");
};
