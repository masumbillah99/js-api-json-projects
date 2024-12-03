const loadMeals = async (searchText, dataLimit) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMeals(data.meals, dataLimit);
};

const displayMeals = (meals, dataLimit) => {
  // console.log(meals);
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";

  // display 9 meals only (not a perfect way)
  const showAll = document.getElementById("show-all");
  if (dataLimit && meals.length > 9) {
    meals = meals.slice(0, 9);
    showAll.classList.remove("d-none");
    console.log("a");
  } else {
    showAll.classList.add("d-none");
  }

  // display no meals found
  const noFoundMsg = document.getElementById("no-found-message");
  if (meals.length === 0) {
    noFoundMsg.classList.remove("d-none");
    showAll.classList.add("d-none");
  } else {
    noFoundMsg.classList.add("d-none");
  }

  //   <div>
  //   <i class="fa-solid fa-bangladeshi-taka-sign"></i>,
  //   ${meal.strCategory}
  // </div>

  // display meals with card
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div class="card h-100">
            <div class="overflow-hidden">
                <img src="${meal.strMealThumb}" class="card-img-top img-animation" alt="...">
            </div>
            <div class="card-body">
                <h4 class="card-title">${meal.strMeal}</h4>
                <h5 class="card-subtitle text-secondary">${meal.strArea}</h5>
                <div class="card-text mt-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="text-warning">
                            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        </div>
                        <button onclick="loadMealDetails(${meal.idMeal})" class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#mealDetailModal">Quick View</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    mealContainer.appendChild(mealDiv);
  });

  // stop spinner / loader
  toggleSpinner(false);
};

// search input field handler
const processSearch = (dataLimit) => {
  // start loader
  toggleSpinner(true);
  const noFoundMsg = document.getElementById("no-found-message");
  const restuTitle = document.getElementById("restu-title");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  if (searchText) {
    loadMeals(searchText, dataLimit);
    restuTitle.classList.remove("d-none");
    noFoundMsg.classList.add("d-none");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Empty input field! Please write any foods name",
    });
    toggleSpinner(false);
    noFoundMsg.classList.remove("d-none");
  }
  // searchField.value = '';
};

// handler search button click
document.getElementById("search-btn").addEventListener("click", () => {
  processSearch(9);
});

// search input field enter key event handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key === "Enter") {
      processSearch(9);
    }
  });

// load spinner function
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loading-spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// not the best way to load show all
document.getElementById("show-all-btn").addEventListener("click", () => {
  processSearch();
});

// load single meal detials
const loadMealDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showMealDetails(data.meals[0]);
};

const showMealDetails = (meal) => {
  const mealdetails = document.getElementById("meal-details");
  mealdetails.innerHTML = `
        <div class="modal-div">
            <img src="${meal.strMealThumb}" class="modal-img rounded-3" alt="">
        </div>        
        <div class="pt-3 px-4">
            <h3>${meal.strMeal}, ${meal.strArea}, ${meal.strCategory}</h3>
            <p>This Food taste is very yummmmy! Sweet and very interesting. Don't forget to try this.</p>
            <div class="d-flex justify-content-between px-2 px-md-5">
                <p><span class="fw-bold fs-3">₹ 99</span> (inc.Tax)</p>
                <button class="btn btn-outline-success px-4 py-1">Buy Now</button>
            </div>
            <hr class="border-warning border-3 my-3">
            <div>
                <h3 class="pb-3"><i>Let's make this yummy food.....</i></h3>
                <h5><u>Ingredients Need:</u></h5>
                <ul class="fw-medium ps-2 ps-md-5">
                    <li>${meal.strIngredient1} - ${meal.strMeasure1}</li>
                    <li>${meal.strIngredient2} - ${meal.strMeasure2}</li>
                    <li>${meal.strIngredient3} - ${meal.strMeasure3}</li>
                    <li>${meal.strIngredient4} - ${meal.strMeasure4}</li>
                    <li>${meal.strIngredient5} - ${meal.strMeasure5}</li>
                    <li>${meal.strIngredient6} - ${meal.strMeasure6}</li>
                    <li>${meal.strIngredient7} - ${meal.strMeasure7}</li>
                </ul>
                <h5><u>Recipe:</u></h5>
                <ol id="meal-instructions" class="fw-medium ps-2 ps-md-5">
                </ol>
            </div>
            <p class="fw-bold text-warning-emphasis d-flex justify-content-end align-items-center mb-3">
                <i class="fa-solid fa-shop"></i> <span class="ps-2">Shohid Resturants</span> 
            </p>
        </div>
    `;

  const instruc = meal.strInstructions;
  const instrucSplit = instruc
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|");
  instrucSplit.forEach((sentence) => {
    const mealInstructions = document.getElementById("meal-instructions");
    const li = document.createElement("li");
    li.style.paddingBottom = "10px";
    li.innerHTML = sentence;
    mealInstructions.appendChild(li);
  });
};

/** show random count number */
const randomMembersNum = () => {
  const randomMember = Math.floor(10000000 * Math.random());
  const randomRestu = Math.floor(10000 * Math.random());
  const randomFeatRestu = Math.floor(1000 * Math.random());
  document.getElementById("members-number").innerText = randomMember;
  document.getElementById("restu-number").innerText = randomRestu;
  document.getElementById("feat-restu").innerText = randomFeatRestu;
};

randomMembersNum();

// loadMeals("chicken");
