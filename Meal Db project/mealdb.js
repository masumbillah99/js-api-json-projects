const loadMeal = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeal(data.meals);
}

const displayMeal = (meals) => {
    // console.log(meals);
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach((meal) => {
        // console.log(meal);
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
                        <i class="fa-solid fa-bangladeshi-taka-sign"></i><i class="fa-solid fa-bangladeshi-taka-sign"></i><i class="fa-solid fa-bangladeshi-taka-sign"></i>, 
                        ${meal.strCategory}</p>
                </div>
        </div>
    `;
        mealContainer.appendChild(mealDiv);
    });
}

const searchMeals = () => {
    const searchText = document.getElementById('search-field').value;
    loadMeal(searchText);
}


loadMeal('pasta');