let ingredientList = []
let recipeList = [] 
let recipeURL =[]
let numRecipes = 0
function findRecipes(){
    const appID = "126f853d"
    const appKey = "b75a83140f5fb9afb204013ae01fbc43"
    let ingredients = ingredientList.toString();
    const query = ingredients
    const recipeCount = numRecipes;
    const mealType = "lunch"
    let htmlrecipeList = document.getElementById("recipes")

    for(let i =0; i<recipeCount; i++){
        let currListElement = document.createElement("li")
        let currLink = document.createElement("a")
        let num = i+1
        currLink.id = "r" + num;
        currLink.target = "_blank"
        currLink.href = ""
        currListElement.append(currLink)
        htmlrecipeList.append(currListElement)
    }
    

    
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&mealType=${mealType}`)
    .then(response => response.json())
    .then(data => {
        const recipes = data.hits.map(hit => hit.recipe);
        recipes.forEach(recipe => recipeList.push(recipe.label));
        recipes.forEach(recipe => recipeURL.push(recipe.shareAs));
        recipes.forEach(recipe => console.log(recipe));
        displayRecipes()
    })
    .catch(error => console.error(error));

    
}

function displayRecipes(){
    console.log(recipeList)
    for(let i = 0; i<recipeList.length; i++){
        let num = i+1
        let elementID = "r"+num
        console.log(elementID)
        document.getElementById(elementID).href = recipeURL[i]
        document.getElementById(elementID).innerHTML = recipeList[i]
    }
   
}


function addToList(){
let li = document.createElement('li')
document.getElementById("list").append(li)
let div1 = document.createElement('div')
div1.classList.add('list')
let div2 = document.createElement('div')
div2.classList.add('content')
div2.innerHTML = "--> "+document.getElementById("ingredient").value
ingredientList.push(document.getElementById("ingredient").value)
document.getElementById("ingredient").value = ''
li.append(div1)
div1.append(div2)
}

document.addEventListener('DOMContentLoaded', function() {
    //This function is called after the browser has loaded the web page
  document.getElementById("addBtn").addEventListener('click',addToList)
  document.getElementById("find_recipes").addEventListener('click',findRecipes)
  })

var slider = document.getElementById("slider");
document.getElementById("numRecipes").innerHTML = "Show me "+ slider.value + " recipes"
numRecipes = slider.value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    console.log(this.value);
    document.getElementById("numRecipes").innerHTML = "Show me "+ this.value + " recipes"
    numRecipes = this.value
}