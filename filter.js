const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Driver",
    img: "https://picsum.photos/id/101/200/200",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Man Expedition Scout",
    img: "https://picsum.photos/id/102/200/200",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://picsum.photos/id/103/200/200",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap",
    img: "https://picsum.photos/id/104/200/200",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Menu Smartwatch",
    img: "https://picsum.photos/id/108/200/200",
    price: 74,
    cat: "Casual",
  },
  {
    id: 6,
    name: "Rolex Daytona",
    img: "https://picsum.photos/id/106/200/200",
    price: 350,
    cat: "Luxury",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map((product) => {
      return `
        <div class="product">
          <img src="${product.img}" alt="${product.name}">
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
        </div>
      `;
    })
    .join("");
};

displayProducts(data);


searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().includes(value))
    );
  } else {
    displayProducts(data);
  }
});


const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = ["All", ...new Set(allCats)];

  categoriesContainer.innerHTML = categories
    .map((cat) => `<span class="cat">${cat}</span>`)
    .join("");

  const categorySpans = document.querySelectorAll(".cat");

  categorySpans.forEach((catSpan) => {
    catSpan.addEventListener("click", (e) => {
      categorySpans.forEach((el) => el.classList.remove("active"));
      e.target.classList.add("active");

      const selectedCat = e.target.textContent;
      if (selectedCat === "All") {
        displayProducts(data);
      } else {
        displayProducts(data.filter((item) => item.cat === selectedCat));
      }
    });
  });
};


const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    const value = e.target.value;
    priceValue.textContent = "$" + value;
    displayProducts(data.filter((item) => item.price <= value));
  });
};

setCategories();
setPrices();



