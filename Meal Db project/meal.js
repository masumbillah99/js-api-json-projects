const loadMeals = async (searchText, dataLimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals, dataLimit);
}

const displayMeals = (meals, dataLimit) => {
    // console.log(meals);
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';

    // display 9 meals only (not a perfect way)
    const showAll = document.getElementById('show-all');
    if (dataLimit && meals.length > 9) {
        meals = meals.slice(0, 9);
        showAll.classList.remove('d-none');
        console.log('a');
    } else {
        showAll.classList.add('d-none');
    }

    // display no meals found
    const noFoundMsg = document.getElementById('no-found-message');
    if (meals.length === 0) {
        noFoundMsg.classList.remove('d-none');
        showAll.classList.add('d-none');
    } else {
        noFoundMsg.classList.add('d-none');
    }

    // display meals with card
    meals.forEach((meal) => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div class="card h-100">
            <div class="overflow-hidden">
                <img src="${meal.strMealThumb}" class="card-img-top img-animation" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal} - ${meal.strArea}</h5>
                <p class="card-text">
                    <div class="d-flex justify-content-between">
                        <div>
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i><i class="fa-solid fa-bangladeshi-taka-sign"></i><i class="fa-solid fa-bangladeshi-taka-sign"></i>, 
                            ${meal.strCategory}
                        </div>
                        <div class="text-warning"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                    </div>
                </p>
                <button onclick="loadMealDetails(${meal.idMeal})" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#mealDetailModal">Show Details</button>
            </div>
        </div>
    `;
        mealContainer.appendChild(mealDiv);
    });

    // stop spinner / loader
    toggleSpinner(false);
}

// search input field handler
const processSearch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const restuTitle = document.getElementById("restu-title");
    if (searchText) {
        loadMeals(searchText, dataLimit);
        restuTitle.classList.remove('d-none');
    } else {
        alert(`Empty input field!!  Please write phone name`);
        toggleSpinner(false);
    }
    // searchField.value = '';
}

// handler search button click
document.getElementById('search-btn').addEventListener('click', () => {
    processSearch(9);
});

// search input field enter key event handler
document.getElementById('search-field').addEventListener('keypress', function (event) {
    // console.log(event.key);
    if (event.key === "Enter") {
        processSearch(9);
    }
});

// load spinner function
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loading-spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('show-all-btn').addEventListener('click', () => {
    processSearch();
});


// load single meal detials
const loadMealDetails = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showMealDetails(data.meals[0]);
}

const showMealDetails = (meal) => {
    console.log(meal);
    const modalTitle = document.getElementById('mealDetailModalLabel');
    modalTitle.innerText = meal.strMeal;
    const mealdetails = document.getElementById('meal-details');
    // mealdetails.innerHTML = a;
}





loadMeals('chicken');