let ingredientList = []
let recipeList = []
let recipeURL = []
let numRecipes = 0
function findRecipes() {
    if (ingredientList.length > 0) {
        const appID = "126f853d"
        const appKey = "b75a83140f5fb9afb204013ae01fbc43"
        let ingredients = ingredientList.toString();
        const query = ingredients
        const recipeCount = numRecipes;
        let htmlrecipeList = document.getElementById("recipes")
        const mealType = checkMealType()
        const healthLabel = checkHealthLabel()
        let url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&mealType=${mealType}&health=${healthLabel}`;

        for (let i = 0; i < recipeCount; i++) {
            let currListElement = document.createElement("li")
            let currLink = document.createElement("a")
            let num = i + 1
            currLink.id = "r" + num;
            currLink.target = "_blank"
            currLink.href = ""
            currListElement.append(currLink)
            htmlrecipeList.append(currListElement)
        }


        if (mealType === undefined && healthLabel === undefined) {
            url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}`;
        } else if (mealType !== undefined && healthLabel === undefined) {
            url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&mealType=${mealType}`;
        } else if (mealType === undefined && healthLabel !== undefined) {
            url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&health=${healthLabel}`;
        }

        fetch(url)
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
}

function displayRecipes() {
    console.log(recipeList)
    for (let i = 0; i < recipeList.length; i++) {
        let num = i + 1
        let elementID = "r" + num
        console.log(elementID)
        document.getElementById(elementID).href = recipeURL[i]
        document.getElementById(elementID).innerHTML = recipeList[i]
    }

}

function checkMealType() {
    let mealType = document.getElementsByName("mealtype")
    for (let mt of mealType) {
        if (mt.checked) {
            console.log(mt.value)
            return mt.value
        }
    }

    return;
}

function checkHealthLabel() {
    let healthLabel = document.getElementsByName('restrictions')
    for (let rs of healthLabel) {
        if (rs.checked) {
            console.log(rs.value)
            return rs.value;
        }
    }

    return;
}


function addToList() {
    if (document.getElementById("ingredient").value !== "") {


        let li = document.createElement('li')
        document.getElementById("list").append(li)
        let div1 = document.createElement('div')
        div1.classList.add('list')
        let div2 = document.createElement('div')
        div2.classList.add('content')
        div2.innerHTML = "--> " + document.getElementById("ingredient").value
        ingredientList.push(document.getElementById("ingredient").value)
        document.getElementById("ingredient").value = ''
        li.append(div1)
        div1.append(div2)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    //This function is called after the browser has loaded the web page
    document.getElementById("addBtn").addEventListener('click', addToList)
    document.getElementById("find_recipes").addEventListener('click', findRecipes)

    document.addEventListener('keyup', handleKeyUp)
})

function handleKeyUp(e) {
    if (e.which == 13) {
        addToList()
    }

    e.stopPropagation()
    e.preventDefault()
}

var slider = document.getElementById("slider");
document.getElementById("numRecipes").innerHTML = "Show me " + slider.value + " recipes"
numRecipes = slider.value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    console.log(this.value);
    document.getElementById("numRecipes").innerHTML = "Show me " + this.value + " recipes"
    numRecipes = this.value
}