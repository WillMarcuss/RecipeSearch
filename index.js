let ingredientList = []
let recipeList = []
let recipeURL = []
let foodImgs = []
let numRecipes = 0
let Inum = 0
let once = false
let btns = []
numCalories = 0
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
        let calories = checkCalories()
        let url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&mealType=${mealType}&health=${healthLabel}`+calories;

        for (let i = 0; i < recipeCount; i++) {
            let currListElement = document.createElement("li")
            let currImg = document.createElement("img")
            let currLink = document.createElement("a")
            let num = i + 1
            currLink.id = "r" + num;
            currLink.target = "_blank"
            currLink.href = ""
            currImg.src =""
            currImg.id = "img"+num
            currImg.height = "100"
            currImg.width = "100"
            currListElement.append(currLink)
            currListElement.append(currImg)
            htmlrecipeList.append(currListElement)
        }


        if (mealType === undefined && healthLabel === undefined) {
            url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}`+calories;
        } else if (mealType !== undefined && healthLabel === undefined) {
            url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&mealType=${mealType}`+calories;
        } else if (mealType === undefined && healthLabel !== undefined) {
            url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}&to=${recipeCount}&health=${healthLabel}`+calories;
        }

        console.log(url)

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const recipes = data.hits.map(hit => hit.recipe);
                recipes.forEach(recipe => recipeList.push(recipe.label));
                recipes.forEach(recipe => recipeURL.push(recipe.shareAs));
                recipes.forEach(recipe => console.log(recipe));
                recipes.forEach(recipe => foodImgs.push(recipe.image))
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
        let imgID = "img"+num
        console.log(elementID)
        document.getElementById(elementID).href = recipeURL[i]
        document.getElementById(elementID).innerHTML = recipeList[i]
        document.getElementById(imgID).src = foodImgs[i]
        
    }

    if(recipeList.length == 0){
        console.log("no recipes match your search")
        
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

function checkCalories(){
    let checkbox = document.getElementById("setCals")
    if(checkbox.checked){
        let lb = numCalories
        let ub = parseInt(numCalories)+250
        return "&calories="+lb+"-"+ub;
    }

    return "";
}

function addToList() {
    const container = document.querySelector('#list')
    if (document.getElementById("ingredient").value !== "" && !ingredientList.includes(document.getElementById("ingredient").value)) {

        let li = document.createElement('li')
        document.getElementById("list").append(li)
        let div2 = document.createElement('BUTTON')
        div2.id= "I"+Inum
        Inum++
        console.log(div2.id)
        div2.classList.add('content')

        if(once == false){
            container.addEventListener('click',function(e){
                console.log(e.target.id)
                deleteItem(e.target.id)
            });
        }
        once = true
        div2.innerHTML = "--> " + document.getElementById("ingredient").value
        ingredientList.push(document.getElementById("ingredient").value)
        document.getElementById("ingredient").value = ''
        li.append(div2)
    }
}

function deleteItem(eleID){
   var mylist = document.getElementById("list")
    let index
   mylist.querySelectorAll('button').forEach(function(item){
        if(item.id === eleID){
            console.log("if "+item.id +" = "+eleID)
            console.log("removing: "+eleID)
            item.remove();
            index = eleID.split("")[1]
            console.log("splicing: "+index)
            console.log(ingredientList[index])
            ingredientList.splice(index,1)
        }
   });
   reassignIDS(index)
}

function reassignIDS(index){
    var mylist = document.getElementById("list").querySelectorAll('button')
    for(let i = index; i< mylist.length; i++){
        mylist[i].id = "I"+i
    }
}

document.addEventListener('DOMContentLoaded', function () {
    //This function is called after the browser has loaded the web page
    document.getElementById("addBtn").addEventListener('click', addToList)
    document.getElementById("find_recipes").addEventListener('click', findRecipes)
    document.addEventListener('keyup', handleKeyUp)
    document.getElementById("ingredient").addEventListener('input',doesExist)
})

function doesExist(){
    if (ingredientList.includes(document.getElementById("ingredient").value)) {
        document.getElementById("ingredient").style.border = "2px solid #ff1100"
    } else{
        document.getElementById("ingredient").style.border = "2px solid #4CAF50"
    }
}

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

var Cslider = document.getElementById("calorie-slider");
document.getElementById("numCals").innerHTML = "Calories: " + numCalories
numCalories = Cslider.value

// Update the current slider value (each time you drag the slider handle)
Cslider.oninput = function () {
    console.log(this.value);
    document.getElementById("numCals").innerHTML = "Calories: " + numCalories
    numCalories = this.value
}