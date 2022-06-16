
const recipeOfTheDayContainer = document.getElementById('recipeOfTheDay');
function getRecipeOfTheDay() {
  fetch(
    "https://api.spoonacular.com/recipes/random?apiKey=cf6bc23c2919458f81568e2ce81fb926"+
      "&number=1"
  )
    .then((result) => result.json())
    .then((result) => renderRecipe(result.recipes.pop()))
    .catch((err) => console.log(err));
}

function renderRecipe(result) {
    const html = `<div class="container mt-3 rd-info" >
    <div class="container">
        <div class="row">
          <div class="col-md-6 text-center">
            <h1 class="r-name ">${result.title}</h1>
            <div class="container" style="padding-top: 8vh;">
                <h3 class="det">prep time: ${result.readyInMinutes} min</h3><br>
                <h3 class="det">servings: ${result.servings}</h3><br>
                <button  type="button" class="btn btn-outline-danger" onclick="buttonClick(${result.id})">Recipe</button>
            </div>
           
          </div>
          <div class="col-md-6 pt-4">
            <img class="img-fluid" src="${result.image}" alt="">
          </div>
        </div>
      </div>
</div>`;
    recipeOfTheDayContainer.insertAdjacentHTML('beforeend', html)
}

function buttonClick(id) {
    window.location = 'http://localhost:5500/recipedis.html?id='+id;
}

function searchRecipes(str) {
    window.location = 'http://localhost:5500/Recipe.html?search='+str;
}


getRecipeOfTheDay();