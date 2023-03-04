const loadMeal = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeal(data.meals[0]);
}

const displayMeal = (meals) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                            to additional content. This content is a little bit longer.</p>
                    </div>
            </div>
        </div>
    `;
}
















loadMeal('pasta');