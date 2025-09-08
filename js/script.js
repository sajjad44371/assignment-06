const categoriesContainer = document.getElementById("categories-container");
const treeContainer = document.getElementById("tree-container");
const cartContainer = document.getElementById("cart-container");

// load tree categories
const loadTreeCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayTreeCategories(data.categories))
    .catch((error) => console.log("Error: ", error));
};

const displayTreeCategories = (categories) => {
  categoriesContainer.innerHTML = "";
  categories.forEach((element) => {
    categoriesContainer.innerHTML += `
        <div>
            <button onclick="loadTreesByCategory('${element.id}', this)" id="btn-category" class="font-medium p-2 cursor-pointer hover:bg-[#166534] hover:text-white duration-200 w-full rounded-lg text-center xl:text-left">${element.category_name}</button>
        </div>
    `;
  });
};

loadTreeCategories();

// load trees by category
const loadTreesByCategory = (id, btn) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayTreesByCategory(data.plants))
    .catch((error) => console.log("Error: ", error));

  const allBtn = document.querySelectorAll("#btn-category");
  allBtn.forEach((el) => el.classList.remove("bg-[#166534]", "text-white"));
  btn.classList.add("bg-[#166534]", "text-white");
};

const displayTreesByCategory = (categoryPlants) => {
  treeContainer.innerHTML = "";
  categoryPlants.forEach((cat) => {
    treeContainer.innerHTML += `
            <div class="tree-card rounded-lg bg-white shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300">
              <div class="tree-card-content p-4">
                <img src="https://picsum.photos/400/300?random=${Date.now()}" alt="" class="rounded-lg" />
                <button onclick="loadTreeDescription(${
                  cat.id
                })" class="text-[14px] font-semibold my-3 cursor-pointer">${
      cat.name
    }</button>
                <p class="text-[12px] text-gray-400 mb-2 h-[70px]">
                 ${cat.description}
                </p>
                <div class="flex justify-between items-center">
                  <a
                    href=""
                    class="py-1 px-2 bg-[#DCFCE7] rounded-3xl text-[12px] text-[#15803D]"
                    >${cat.category}</a
                  >
                  <h6 class="text-sm font-semibold">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i
                    ><span>${cat.price}</span>
                  </h6>
                </div>
                <button onclick="addToCart('${cat.name}', ${cat.price})" 
                  class="btn bg-[#15803d] text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#facc15] hover:to-[#15803d] mt-3 block rounded-3xl w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
  manageSpinner(false);
};

// load tree description
const loadTreeDescription = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((desc) => showTreeDescription(desc.plants))
    .catch((error) => console.log("Error: ", error));
};

const showTreeDescription = (description) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
    <div>
        <h3 class="text-xl md:text-2xl font-bold mb-2.5">${
          description.name
        }</h3>
        <img src="https://picsum.photos/400/300?random=${Date.now()}" alt="" class />
        <h3 class="text-sm md:text-lg text-gray-600"><span class="font-bold text-black">Category:</span> ${
          description.category
        }</h3>
        <h4 class="text-sm md:text-lg text-gray-600 my-1.5"><span class="font-bold text-black">Price:</span> ${
          description.price
        }</h4>
        <p class="text-sm md:text-lg text-gray-600"><span class="font-bold text-black">Description:</span> ${
          description.description
        }</p>
    </div>
  `;
  document.getElementById("my_modal").showModal();
};

// load all plants
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants))
    .catch((error) => console.log("Error: ", error));

  const allTreeBtn = document.querySelector(".btn-all-tree");
  window.addEventListener("DOMContentLoaded", () => {
    allTreeBtn.classList.add("bg-[#166534]", "text-white");
  });
  allTreeBtn.addEventListener("click", function () {
    document.querySelectorAll("#btn-category").forEach((btn) => {
      btn.classList.remove("bg-[#166534]", "text-white");
    });

    this.classList.add("bg-[#166534]", "text-white");
  });
};

// <img src="${plant.image}" alt="" class="rounded-lg" />
const displayAllPlants = (allPlants) => {
  treeContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    console.log(plant);
    treeContainer.innerHTML += `
            <div class="tree-card rounded-lg bg-white shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300">
              <div class="tree-card-content p-4">
                <img src="https://picsum.photos/400/300?random=${Date.now()}" alt="" class="rounded-lg" />
                
                <button onclick="loadTreeDescription(${
                  plant.id
                })" class="text-[14px] font-semibold my-3 cursor-pointer">${
      plant.name
    }</button>
                <p class="text-[12px] text-gray-400 mb-2 h-[70px]">
                 ${plant.description}
                </p>
                <div class="flex justify-between items-center">
                  <a
                    href=""
                    class="py-1 px-2 bg-[#DCFCE7] rounded-3xl text-[12px] text-[#15803D]"
                    >${plant.category}</a
                  >
                  <h6 class="text-sm font-semibold">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i
                    ><span>${plant.price}</span>
                  </h6>
                </div>
                <button onclick="addToCart('${plant.name}',${plant.price})" 
                  class="btn bg-[#15803d] text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#facc15] hover:to-[#15803d] mt-3 block rounded-3xl w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
};

loadAllPlants();

// add to cart
const addToCart = (name, price) => {
  console.log(name, price);
  cartContainer.innerHTML += `
                  <div
                    class="single-cart flex justify-between items-center mb-3 bg-[#f0fdf4] rounded-lg p-2"
                  >
                    <div class="">
                      <h6 class="text-sm font-semibold">${name}</h6>
                      <p class="text-sm font-semibold text-[#8c8c8c]">
                        <i class="fa-solid fa-bangladeshi-taka-sign"></i
                        ><span class="text-sm item-price">${price}</span
                        ><i class="fa-solid fa-xmark"></i><span>1</span>
                      </p>
                    </div>
                    <div>
                      <i
                        class="fa-solid fa-xmark text-[#8c8c8c] cursor-pointer remove-item"
                      ></i>
                    </div>
                  </div>
    `;
  alert(`${name} has been added to the cart 🚀`);
  totalAmount();
};

// remove item
cartContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
    event.target.closest(".single-cart").remove();
    totalAmount();
  }
});

// add amount
const totalAmount = () => {
  let total = 0;
  const prices = cartContainer.querySelectorAll(".single-cart .item-price");

  prices.forEach((priceE1) => {
    const price = parseInt(priceE1.textContent) || 0;
    total += price;
  });

  document.getElementById("total-amount").innerText = total;
};

// spinner
const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("invisible");
    document.getElementById("tree-container").classList.add("invisible");
  } else {
    document.getElementById("tree-container").classList.remove("invisible");
    document.getElementById("spinner").classList.add("invisible");
  }
};

//newsletter
document.getElementById("btn-nwsltr").addEventListener("click", function () {
  alert("Thanks For Donating 🩷...");
});

//go to top
const goTopBtn = document.getElementById("goTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 1) {
    goTopBtn.classList.remove("hidden");
  } else {
    goTopBtn.classList.add("hidden");
  }
});

goTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// footer year
document.getElementById("year").textContent = new Date().getFullYear();
