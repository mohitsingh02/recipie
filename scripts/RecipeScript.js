const searchFor = window.location.search?.split("?search=")?.pop();
const container = document.getElementById("result-container");
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('button-addon2');

function getRecipes() {
  searchBox.value = searchFor;
  fetch(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=cf6bc23c2919458f81568e2ce81fb926" +
      "&query=" +
      searchFor +
      "&number=10"
  )
    .then((result) => result.json())
    .then((result) => renderRecipes(result.results))
    .catch((err) => console.log(err));
}

function renderRecipes(result) {
  container.innerHTML = '';
  const div = document.createElement("div");
  div.className = "row";
  for (let i = 0; i < result.length; i++) {
    div.innerHTML += ` <div class="col-md-6 col-lg-4 mt-3"><div class="card bg-dark">
        <img src="${result[i].image}" height="350" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"> <a class="card-title" href="/recipedis.html?id=${result[i].id}">${result[i].title}</a> </h5>
        </div>
    </div></div>`;
  }
  container.appendChild(div);
}

function searchQuery() {
    const str = searchBox.value;
    fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=cf6bc23c2919458f81568e2ce81fb926" +
          "&query=" +
          str+"&titleMatch="+str+
          "&number=10"
      )
        .then((result) => result.json())
        .then((result) => renderRecipes(result.results))
        .catch((err) => console.log(err));
}

searchButton.addEventListener('click', searchQuery)

getRecipes()
