const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsGrid = document.getElementById('results-grid');

searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        searchRecipes();
    }
});

async function searchRecipes() {
    const ingredient = searchInput.value.trim();
    if (!ingredient) {
        resultsGrid.innerHTML = '<p class="placeholder-text">Please enter an ingredient to search.</p>';
        return;
    }

    resultsGrid.innerHTML = '<p class="placeholder-text">Searching recipes...</p>';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }

        const data = await response.json();
        showRecipes(data.meals);
    } catch (error) {
        console.error(error);
        resultsGrid.innerHTML = '<p class="placeholder-text">Unable to load recipes. Please try again.</p>';
    }
}

function showRecipes(meals) {
    if (!meals) {
        resultsGrid.innerHTML = '<p class="placeholder-text">No recipes found. Try another ingredient.</p>';
        return;
    }

    resultsGrid.innerHTML = '';

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        resultsGrid.appendChild(card);
    });
}
