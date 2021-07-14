// 1. create search input box and button (html) & <ul> to hold search results
// 2. create a function that appends the HTML you want to display a search result to the ul
// 3. create a function to append a comment box to a search result item
// 4. Style all the above w/ css
// 5. Add JS to execute search to api when they click search button
// 6. Add JS to render results (call 2 and 3)

document.addEventListener("DOMContentLoaded", () => {
  searchForm()
     });
 
 function searchForm(){
   const form = document.querySelector("button")
   form.addEventListener("click", (e) =>  {
     e.preventDefault();
     const byDrinks = document.getElementById('by-drink')
     const byIngredients = document.getElementById('by-ingredient')
 
     if (byDrinks.checked){
       const string = document.querySelector("#search-item").value
       fetchdata(string);
     }
 
     if (byIngredients.checked){
       const string = document.querySelector("#search-item").value
       fetchByIngredients(string);
     }
   })
   const random = document.getElementById('random')
   random.addEventListener('click', () => {
     fetchRandom()
   })
 }

function fetchdata(string) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${string}`)
    .then((res) => res.json())
    .then((data) => renderCocktails(data));
}

function fetchByIngredients(ingredients){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  .then(res => res.json())
  .then(data => renderCockTails(data))
}

function fetchRandom(){
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data => renderCockTails(data))
}

function renderCocktails(data) {
  data.drinks.forEach((drink) => {
      //if (data = []){

        //  const sorry = document.createElement('div')
          //sorry.innertext = "Sorry, we found no cocktails matching your search criteria. Please try again."
         // document.querySelector

     // }
    let likes = 0
    const newDiv = document.createElement("div");

    const cocktailName = document.createElement("h2");
    cocktailName.innerText = drink.strDrink;

    // add img
    const picture = document.createElement("img");
    picture.src = drink.strDrinkThumb;


    const recH4 = document.createElement("h4");
    recH4.innerText = "Recipe";

    const ingredients = document.createElement("ul");
    const ingredientArray = []
    for (let i=1; i<=15; i++) {
        if(!drink[`strIngredient${i}`]) {
            break;
        }
        const li = document.createElement('li');
        const liquor = drink[`strIngredient${i}`];
        const measurement = drink[`strMeasure${i}`];
        if(measurement) {
            li.innerText = `${liquor} - ${measurement}` // Tequlia - 1.5oz

        }else{
            li.innerText = liquor;}
        
        ingredientArray.push(li);
    ingredientArray.forEach(listElement => ingredients.append(listElement));
   
    const instructions = document.createElement("li");
    instructions.innerText = drink.strInstructions;
    ingredients.append(instructions);



    recH4.append(ingredients)}


    newDiv.classList.add('recommendation-card')
    
    const likesDiv = document.createElement("div");
    const likesButton = document.createElement("button");
    const comments = document.createElement("div");
    const commentInput = document.createElement("input");
    const commentBtn = document.createElement("button");
    likesButton.innerText = "like it";
    likesDiv.innerText = `${likes} likes`
    commentBtn.innerText = "comment";

    
    
    newDiv.append(cocktailName, picture, recH4, likesDiv, likesButton, comments, commentInput, commentBtn);
    document.querySelector("#cocktail-card-container").append(newDiv);



          

    commentBtn.addEventListener("click", function () {
      const newComment = document.createElement("p");
      newComment.innerText = commentInput.value;
      comments.append(newComment);
    });
   likesButton.addEventListener('click', function(){
        likes++
        likesDiv.innerText = `${likes} likes`
   })
   
  });
}

// //for(let i=1; i<16; i++) {
//     if(!drinkData[`strIngredient${i}`]) {
//         break;
//     }
//     const ingred = drinkData[`strIngredient${i}`]
//     const measurement = drinkData[`strMeasure${i}`]
//     // some html would exisit for you to append this to
//     renderMeasurements(ingred, measurement)

// }

// renderMeasurements(ingred, measure)  {
//     const li = document.createElement('li')
//     li.innerText = `${ingred} - ${measure}`
//     document.querySelector('measurementlist id').append(li)
// }

   // const ingred = drinkData[`strIngredient${i}`]
   // const measurement = drinkData[`strMeasure${i}`]
   // for(let i=1; i<16; i++){
      //  if(!drinkData[`strIngredient${i}`]) {
