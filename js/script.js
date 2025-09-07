const categoriesContainer = document.getElementById("categories-container");
const treeContainer = document.getElementById("tree-container");
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
            <button onclick="loadTreesByCategory('${element.id}', this)" id="btn-category" class="font-medium p-1.5 cursor-pointer hover:bg-[#166534] hover:text-white duration-200 w-full text-left">${element.category_name}</button>
        </div>
    `;
  });
};

loadTreeCategories();

// load trees by category
const loadTreesByCategory = (id, btn) => {
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
            <div class="tree-card rounded-lg bg-white">
              <div class="tree-card-content p-4">
                <img src="${cat.image}" alt="" class="rounded-lg" />
                <button onclick="loadTreeDescription(${cat.id})" class="text-[14px] font-semibold my-3 cursor-pointer">${cat.name}</button>
                <p class="text-[12px] text-gray-400 mb-2">
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
                <button
                  class="btn bg-[#15803d] text-white mt-3 block rounded-3xl w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
};

// <!-- Open the modal using ID.showModal() method -->
// <button class="btn" onclick="my_modal.showModal()">open modal</button>
// <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
//   <div class="modal-box">
//     <h3 class="text-lg font-bold">Hello!</h3>
//     <p class="py-4">Press ESC key or click the button below to close</p>
//     <div class="modal-action">
//       <form method="dialog">
//         <!-- if there is a button in form, it will close the modal -->
//         <button class="btn">Close</button>
//       </form>
//     </div>
//   </div>
// </dialog>

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
        <h3>${description.name}</h3>
        <img src="" alt="" />
        <h3><span>Category:</span> ${description.category}</h3>
        <h4><span>Price:</span> ${description.price}</h4>
        <p><span>Description:</span> ${description.description}</p>
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
};

const displayAllPlants = (allPlants) => {
  treeContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    treeContainer.innerHTML += `
            <div class="tree-card rounded-lg bg-white">
              <div class="tree-card-content p-4">
                <img src="" alt="" class="rounded-lg" />
                <button onclick="loadTreeDescription(${plant.id})" class="text-[14px] font-semibold my-3 cursor-pointer">${plant.name}</button>
                <p class="text-[12px] text-gray-400 mb-2">
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
                <button
                  class="btn bg-[#15803d] text-white mt-3 block rounded-3xl w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
    `;
  });
};

loadAllPlants();

// footer year
document.getElementById("year").textContent = new Date().getFullYear();
