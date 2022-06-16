const recipeId = window.location.search?.split("?id=")?.pop();

const HeaderContainer = document.getElementById('recipe-details');
const IngredientsContainer = document.getElementById('ingredients');
const instructionsContainer = document.getElementById('instructions');
const pageHeading = document.getElementById('page-heading')

function getRecipeInfo() {
  fetch(
    "https://api.spoonacular.com/recipes/informationBulk?apiKey=cf6bc23c2919458f81568e2ce81fb926&ids="+recipeId
  )
    .then((res) => res.json())
    .then((result) => renderRecipe(result[0]))
    .catch((err) => console.log(err));
}

function renderRecipe(result) {
    pageHeading.innerText = `Recipe: ${result.title}`
    const headerHTMl = `<div class="row">
    <div class="col-md-7 text-center">
      <h1 class="r-name ">${result.title}</h1>
              <div class="container" style="padding-top: 8vh;">
                  <h3 class="det">prep time: ${result.readyInMinutes} min</h3><br>
                  <h3 class="det">servings: ${result.servings}</h3><br>
              </div>
    </div>
    <div class="col-md-5 mt-2">
      <img class="img-fluid"  src="${result.image}" alt="...">
    </div>
  </div>`;
  const ingredientUl = document.createElement('ul');
  ingredientUl.className = 'ingrdnt';
  for(let i = 0; i < result.extendedIngredients.length; i++){
    const li = document.createElement('li');
    li.innerText = result.extendedIngredients[i].originalString;
    ingredientUl.appendChild(li);
  }
  IngredientsContainer.appendChild(ingredientUl);
  const instructionUl = document.createElement('ul');
  instructionUl.className = 'step';

  for(let i = 0; i < result.analyzedInstructions[0].steps.length; i++) {
    const li = document.createElement('li');
          li.innerText = result.analyzedInstructions[0].steps[i].step;
          instructionUl.appendChild(li);
  }
  instructionsContainer.appendChild(instructionUl);
  HeaderContainer.insertAdjacentHTML('afterbegin', headerHTMl);
}


getRecipeInfo();