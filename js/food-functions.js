// Food constructor
function Food(name, serveSize, cals, protein, carbs, sodium){
    this.name = name;
    this.serveSize = serveSize;
    this.cals = cals;
    this.protein = protein;
    this.carbs = carbs;
    this.sodium = sodium;
}

function addFood(food, amount){
    const scale = amount / food.serveSize;
    const newServeSize = amount % 1 == 0 ? amount : amount.toFixed();
    const newItem = {
        name: food.name,
        serveSize: newServeSize,
        cals: food.cals * scale,
        protein: food.protein * scale,
        carbs: food.carbs * scale,
        sodium: food.sodium * scale
    }
    eatenFoods.push(newItem);
    saveToLocalStorage('eatenFoods', eatenFoods);
    calcTotals();
}

function calcTotals(){
    // Reset totals
    totalCals = 0;
    totalProtein = 0;
    totalCarbs = 0;
    totalSodium = 0;

    // Calculate the total of each property in the array
    for(let i = 0; i < eatenFoods.length; i++){
        const food = eatenFoods[i];
        totalCals += food.cals
        totalProtein += food.protein;
        totalCarbs += food.carbs;
        totalSodium += food.sodium;
    }

    // Format decimal totals
    if (totalCals % 1 !== 0) totalCals = totalCals.toFixed(2);
    if (totalProtein % 1 !== 0) totalProtein = totalProtein.toFixed(2);
    if (totalCarbs % 1 !== 0) totalCarbs = totalCarbs.toFixed(2);
    if (totalSodium % 1 !== 0) totalSodium = totalSodium.toFixed(2);

    fillTotalsTable();
}

function fillTotalsTable(){
    const calData = document.getElementById("cal-data");
    const proData = document.getElementById("pro-data");
    const carbData = document.getElementById("carb-data");
    const sodData = document.getElementById("sod-data");

    calData.textContent = totalCals;
    proData.textContent = totalProtein + " g";
    carbData.textContent = totalCarbs + " g";
    sodData.textContent = totalSodium + " mg";
}

function resetDay(){
    eatenFoods = [];
    calcTotals();
    populateTable();
}

function populateFoodSelector(){
    for(let i = 0; i < foodItems.length; i++){
        const food = foodItems[i].name;
        foodSelector.innerHTML += `<option value="${food}">${food}</option>`;
    }
}

function sortFoodSelector(){
    foodItems.sort((a, b) =>{
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })
}

function populateTable(){
    const foodTable = document.querySelector(".food-table");
    // Reset the food table data
    foodTable.innerHTML = "";

    // Format the food properties
    

    // Populate the food table with the eaten food data
    for(let i = 0; i < eatenFoods.length; i++){
        const food = eatenFoods[i];

        // Format values properly if they are decimals
        const cals = food.cals % 1 == 0 ? food.cals : food.cals.toFixed(2);
        const protein = food.protein % 1 == 0 ? food.protein : food.protein.toFixed(2);
        const carbs = food.carbs % 1 == 0 ? food.carbs : food.carbs.toFixed(2);
        const sodium = food.sodium % 1 == 0 ? food.sodium : food.sodium.toFixed(2);

        foodTable.innerHTML += `<tr>
        <td>${food.name}</td>
        <td>${food.serveSize}</td>
        <td>${cals}</td>
        <td>${protein}</td>
        <td>${carbs}</td>
        <td>${sodium}</td>
        <td class='btn-remove'><button id='btn-remove-${i}'>X</button></td>
        </tr>`
    }

    initRemoveButtons();
}

function initRemoveButtons(){
    for(let i = 0; i < eatenFoods.length; i++){
        const btn = document.getElementById(`btn-remove-${i}`);
        btn.addEventListener("click", () =>{
            eatenFoods.splice(i, 1);
            saveToLocalStorage('eatenFoods', eatenFoods);
            populateTable();
            calcTotals();
        });
    }
}