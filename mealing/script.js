function searchMeal() {
    // Récupérer la valeur de l'entrée de recherche et la nettoyer des espaces inutiles
    const searchInput = document.getElementById('searchInput').value.trim();
    // Récupérer l'élément HTML où seront affichés les détails des repas
    const mealDetails = document.getElementById('mealDetails');
  
    // Effectuer une requête GET à l'API MealDB en fonction de la valeur de recherche
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then(response => response.json()) // Convertir la réponse en JSON
      .then(data => {
        mealDetails.innerHTML = ''; // Effacer le contenu précédent des détails du repas
        // Vérifier si des repas ont été trouvés dans la réponse
        if (data.meals) {
          // Parcourir tous les repas trouvés dans la réponse
          data.meals.forEach(meal => {
            // Créer un élément HTML pour chaque repas et l'ajouter aux détails du repas
            const mealDiv = createMealElement(meal);
            mealDetails.appendChild(mealDiv);
          });
        } else {
          // Afficher un message si aucun plat n'a été trouvé
          mealDetails.innerHTML = '<p>Aucun plat trouvé.</p>';
        }
      })
      .catch(error => {
        // Gérer les erreurs de requête et afficher un message dans la console
        console.error('Erreur lors de la recherche de plat : ', error);
      });
}

// Fonction pour créer un élément HTML représentant un plat
function createMealElement(meal) {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('recipe');
    mealDiv.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    `;
    
    return mealDiv;
}
// Fonction pour ajouter un plat aux favoris
function addToFavorites(mealName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Récupérer les favoris du stockage local ou initialiser un tableau vide
    favorites.push(mealName); // Ajouter le nom du plat aux favoris
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Enregistrer les favoris dans le stockage local
    alert('Plat ajouté aux favoris !'); // Afficher une alerte pour confirmer l'ajout aux favoris
}
