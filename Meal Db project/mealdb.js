const loadMeals = async (searchText, dataLimit) => {
    const inputField = document.getElementById('search-field').value;
    const noFoundMsg = document.getElementById('no-found-message');
    const restuTitle = document.getElementById('restu-title');
    // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    if (inputField) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputField}`)
            .then(res => res.json())
            .then((data) => {
                displayMeal(data.meals, dataLimit);
            })
        // restuTitle.classList.remove('d-none');
    } else {
        noFoundMsg.classList.remove('d-none');
        restuTitle.classList.add('d-none');
    }

    // document.getElementById('search-field').value = '';

    // try {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     displayMeal(data.meals, dataLimit);
    // } catch (error) {
    //     showErrorMsg();
    // }
};


const displayMeal = (meals, dataLimit) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';

    // display 10 food items only (not a perfect way)
    const showAll = document.getElementById('show-all');
    const noFoundMsg = document.getElementById('no-found-message');
    if (meals.length > 9) {
        // console.log(meals);
        meals = meals.slice(0, 9);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    /** 
    if (dataLimit && meals.length > 6) {
        meals = meals.slice(7, 20);
        showAll.classList.add('d-none');
        // noFoundMsg.style.display = 'none';
        console.log('a');
    } else {
        meals = meals.slice(0, 6);
        showAll.classList.remove('d-none');
        noFoundMsg.style.display = 'none';
        console.log('c');
    }
    */

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
                    ${meal.strCategory}
                </p>
            </div>
        </div>
    `;
        mealContainer.appendChild(mealDiv);
    });

    // stop spinner / loader
    toggleSpinner(false);
}

const searchMeals = (dataLimit) => {
    // start spinner / loader
    toggleSpinner(true);
    const inputField = document.getElementById('search-field').value;
    const restuTitle = document.getElementById('restu-title');
    const noFoundMsg = document.getElementById('no-found-message');
    if (inputField) {
        loadMeals(inputField, dataLimit);
        restuTitle.classList.remove('d-none');
        noFoundMsg.classList.add('d-none');
    } else {
        toggleSpinner(false);
        alert('no input found');
    }
}

// handler search button click
document.getElementById('search-btn').addEventListener('click', () => {
    searchMeals(9);
});

// show error message function
const showErrorMsg = () => {
    // const noFoundMsg = document.getElementById('no-found-message');
    // noFoundMsg.classList.remove('d-none');
    // sweet alert for error
    // swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!',
    //     footer: '<a href="">Why do I have this issue?</a>'
    // })
    alert('food item is not found. & please enter a valid food name');
    return;
}

// search input field enter key event handler
document.getElementById('search-field').addEventListener('keypress', (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
        searchMeals();
    }
})

// load toggle spinner function
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
    searchMeals();
});



// loadMeals('chicken');