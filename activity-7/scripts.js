//Part A
const array1 = ["index 0", "index 1", "index 2"];
const array2 = new Array("index 0", "index 1", "index 2", "index 3");
console.log(array1);
console.log(array2);
console.log("Adding array elements to the end with push()");
array2.push("index " + array2.length);
console.log(array2);
console.log("taking off the end with pop()");
let poppedValue = array2.pop();
console.log(array2);
console.log("and pop returns the value it removed, which was: " + poppedValue);
console.log("shift() will remove the first element and return it.");
let shiftedValue = array2.shift();
console.log(array2);
console.log("unshift() will add its arguments to the beginning.");
array2.unshift(shiftedValue);
console.log(array2);

console.log("looping with for loop");
for (let i = 0; i < array2.length; i++) {
    console.log(array2[i]);
}
console.log("looping with for of");

for (let index of array2) {
    console.log(index);
}
console.log("looping with forEach");
array2.forEach(index => console.log(index));
console.log("looping with map");
array2.map(index => console.log(index));
console.log("looping with filter");
array2.filter(index => console.log(index));
const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3"
}
console.log("accessing obj values with obj.key1: " + obj.key1);
let key = "key2";
console.log("accessing obj values with obj[key] where key is equal to a \"key2\" string: " + obj[key]);
console.log("adding new values to an obj is setting a key that you want to add equal to a value. like obj.key4 = \"value4\"");
obj.key4 = "value4";
console.log(obj);
console.log("modifing values in an obj is setting a key that you want to change equal to a value. like obj.key1 = 1");
obj.key1 = 1;
console.log(obj);
console.log("deleting values in an obj is getting a key that you want to delete and putting the keyword \"delete\" in front. like delete obj.key4");
delete obj.key4
console.log(obj);


//Part B
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Bluetooth headphones with 30 hours of battery life.",
        price: 89.99,
        category: "Electronics",
        image: "images/headphones.jpg"
    },
    {
        id: 2,
        name: "Smartwatch",
        description: "Water-resistant smartwatch with heart-rate monitor and GPS tracking.",
        price: 199.99,
        category: "Accessories",
        image: "images/watch.jpg"
    },
    {
        id: 3,
        name: "Office Chair",
        description: "Adjustable mesh chair with lumbar support for long working hours.",
        price: 149.99,
        category: "Furniture",
        image: "images/chair.jpg"
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        description: "Insulated bottle keeps drinks cold for 24 hours or hot for 12 hours.",
        price: 24.99,
        category: "Accessories",
        image: "images/waterbottle.jpg"
    },
    {
        id: 5,
        name: "4K Ultra HD Monitor",
        description: "27-inch display with vibrant colors and ultra-slim design.",
        price: 329.99,
        category: "Electronics",
        image: "images/monitor.jpg"
    }
];

console.log("Accessing product data in an array of objects. Get the object, then the data. products[0] is the object. " + products[0].name + " products[0].name gets the name of the first product.");
console.log("You can use filter to grab every product that follows a condition. For example getting all the electronics.");
let electronics = products.filter(product => product.category == "Electronics");
console.log(electronics);

console.log("Calculating the sum of all the prices with reduce.");
let total = products.reduce((sum, product) => sum + product.price, 0);
console.log("Total:", total);
let avgPrice = total / products.length;
console.log("Average Price:", avgPrice);


let productCount = 0;
const productCountEl = document.getElementById('product-count');
const productContainerEl = document.getElementById('product-grid');

function displayAllProducts() {
    products.forEach(product => createCardEl(product));
}
displayAllProducts();

function createCardEl(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <h3>Category: ${product.category}</h3>
        <img src="${product.image}" alt="${product.name}">
      `;

    productContainerEl.appendChild(card);
    productCount++;
    productCountEl.innerHTML = `products available: ${productCount}`;
}

const filtersEl = document.querySelector('.filter-controls');
const accessoriesFilterEl = filtersEl.children[0];
const electronicsFilterEl = filtersEl.children[1];
const furnitureFilterEl = filtersEl.children[2];
const clearFiltersEl = filtersEl.children[3];
const searchInputEl = document.getElementById('search');

let currentFilteredButtonList = products;
let currentFilteredSearchList = [];

accessoriesFilterEl.addEventListener('click', filterCards);
electronicsFilterEl.addEventListener('click', filterCards);
furnitureFilterEl.addEventListener('click', filterCards);
clearFiltersEl.addEventListener('click', () => {
    searchInputEl.value = "";
    clearActiveFilter();
    removeHTMLCards();
    displayAllProducts();
});

function removeHTMLCards() {
    let amount = productContainerEl.children.length;
    for (let i = 0; i < amount; i++) {
        productContainerEl.children[0].remove();
    }
    productCount = 0;
    productCountEl.innerHTML = `products available: ${productCount}`;
}

function filterCards(e) {
    removeHTMLCards();
    let filteredProducts = products.filter(product => product.category == e.target.innerHTML);
    // filteredProducts.forEach(product => createCardEl(product));
    makeActiveFilter(e.target);
    currentFilteredButtonList = filteredProducts;
    applySearchAndButtonFilter();
}

function makeActiveFilter(btnEl) {
    clearActiveFilter();
    btnEl.classList.add('active');
}

function clearActiveFilter() {
    accessoriesFilterEl.classList.remove('active');
    electronicsFilterEl.classList.remove('active');
    furnitureFilterEl.classList.remove('active');
    currentFilteredButtonList = products;
}

searchInputEl.addEventListener('input', () => {
    removeHTMLCards();
    let filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInputEl.value.toLowerCase()) || product.description.toLowerCase().includes(searchInputEl.value.toLowerCase()));
    // filteredProducts.forEach(product => createCardEl(product));
    currentFilteredSearchList = filteredProducts;
    applySearchAndButtonFilter();
});

function applySearchAndButtonFilter() {
    console.log(currentFilteredButtonList);
    console.log(currentFilteredSearchList);
    let filtered = products.filter(product => (currentFilteredButtonList.includes(product)) && (currentFilteredSearchList.includes(product)));
    filtered.forEach(product => createCardEl(product));
}