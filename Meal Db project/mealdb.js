const loadMeal = async (searchText) => {
    // const inputField = document.getElementById('search-field').value;
    // const restuTitle = document.getElementById('restu-title');
    // const noFoundMsg = document.getElementById('no-found-message');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // if (inputField) {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => displayMeal(data.meals))
    //         .catch((err) => {
    //             noFoundMsg.classList.remove('d-none');
    //             restuTitle.classList.add('d-none');
    //         })
    // }
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMeal(data.meals);
    } catch (error) {
        showErrorMsg();
    }

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
    const inputField = document.getElementById('search-field').value;
    const restuTitle = document.getElementById('restu-title');
    const noFoundMsg = document.getElementById('no-found-message');
    if (inputField) {
        loadMeal(inputField);
        noFoundMsg.classList.add('d-none');
    } else {
        noFoundMsg.classList.remove('d-none');
        restuTitle.classList.add('d-none');
    }
}

const showErrorMsg = () => {
    // const noFoundMsg = document.getElementById('no-found-message');
    // noFoundMsg.classList.remove('d-none');
    // sweet alert for error
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}



loadMeal('pasta');