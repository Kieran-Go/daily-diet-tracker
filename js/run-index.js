let foodItems = loadFromLocalStorage("foodItems") || [
    // Breakfast items
    new Food("Uncle Toby's Oats", 40, 153, 5.1, 22.7, 2, "Breakfast"),
    new Food("Mixed Frozen Berries", 150, 61, 1.3, 10.3, 5, "Breakfast"),
    new Food("Lite Milk", 250, 111, 8.8, 11.5, 110, "Breakfast"),

    // Lunch items
    new Food("Apple", 120, 63, 0.31, 16.57, 0, "Lunch"),
    new Food("Almonds", 30, 176, 5.9, 1.6, 5, "Lunch"),
    new Food("Bread - Wholemeal", 74, 174.2, 8.4, 26.2, 264, "Lunch"),
    new Food("English Leg Ham", 40, 36.3, 6.5, 0.6, 376, "Lunch"),
    new Food("Boiled Eggs", 104, 148, 12.7, 1.4, 141, "Lunch"),
    new Food("Cheese", 25, 100.3, 5.9, 0.2, 174, "Lunch"),

    // Dinner items
    new Food("Steak - Oyster Blade", 200, 274, 40, 0, 172, "Dinner"),
    new Food("Pork Chop", 200, 462, 48, 0, 148, "Dinner"),
    new Food("Broccoli", 50, 16, 1.4, 3.5, 16.5, "Dinner"),
    new Food("Cauliflower", 50, 12.5, 0.95, 2.5, 15, "Dinner"),
    new Food("Carrot", 100, 41, 0.9, 10, 69, "Dinner"),
    new Food("Frozen Peas & Sweetcorn", 100, 93, 4.4, 13, 9, "Dinner"),
    new Food("Frozen String Beans", 100, 36, 1.6, 5.2, 6, "Dinner"),
    new Food("Vegetables", 400, 198.5, 9.25, 34.2, 115.5, "Dinner"),
    new Food("Thai Jasmine Rice", 70, 251, 5, 54.7, 4, "Dinner"),
    new Food("Vermont Curry Roux", 19, 96.3, 1.2, 7.5, 872, "Dinner"),

    // Misc
    new Food("Butter - Devondale", 5, 29.3, 1, 1, 26, "Misc"),
    new Food("Extra Virgin Olive Oil", 15, 123.5, 0, 0, 0, "Misc"),
    new Food("Minced Garlic", 5, 4.7, 0.2, 1, 29, "Misc"),
];
sortFoodSelector(); // Sort the array alphabetically

// Initialize the 'eaten foods' array and table
let eatenFoods = loadFromLocalStorage('eatenFoods') || [];
populateTable();

// Initialize the totals
let totalCals = 0;
let totalProtein = 0;
let totalCarbs = 0;
let totalSodium = 0;
calcTotals();

// Initialize the food selector
const foodSelector = document.getElementById("food-selector");
populateFoodSelector();
foodSelector.addEventListener("change", () =>{
    const defaultText = document.getElementById("amount-default");
    const amount = document.querySelector(".amount");
    let serveSize = 0;
    for(let i = 0; i < foodItems.length; i++){
        if(foodSelector.value === foodItems[i].name){
            serveSize = foodItems[i].serveSize;
            break;
        }
    }
    defaultText.textContent = `1 serving = ${serveSize} g`;
    amount.value = serveSize;
});

const addBtn = document.querySelector(".btn-add-food");
addBtn.addEventListener("click", () =>{
    const amount = document.querySelector(".amount").value;
    if(amount != "" && !isNaN(amount) && amount > 0)
    for(let i = 0; i < foodItems.length; i++){
        const food = foodItems[i];
        if(foodSelector.value === foodItems[i].name){
            addFood(food, amount);
            populateTable();
            break;
        }
    }
});

const clearBtn = document.querySelector(".btn-clear-table");
clearBtn.addEventListener("click", ()=>{
    eatenFoods.splice(0, eatenFoods.length);
    saveToLocalStorage('eatenFoods', eatenFoods);
    populateTable();
    calcTotals();
});

function validateData(dat){
    if(isNaN(dat) || dat < 0 || dat.trim() === ""){
        alert("Invalid data! Must be a number and non-negative!");
        return true;
    }
    else if(dat === null){
        return true;
    }
}

// Capitalize the first letter of every word in a string
function capitalizeFirstLetter(val) {
    return String(val)
        .split(" ")
        .map(word => {
            if (/^[a-zA-Z]/.test(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word; // Return the word unchanged if it starts with a non-letter
        })
        .join(' '); // Join the array back into a single string
}


const newFoodBtn = document.querySelector(".btn-new-food");
newFoodBtn.addEventListener("click", () =>{
    const newName = capitalizeFirstLetter(prompt("Please enter the food name:"));
    if (newName.trim() === "") {
        alert("Invalid data! Food name cannot be empty.");
        return;
    }
    else if(newName === "Null") return;
    // Check that this food does not share a name with another already in the array
    for(let i = 0; i < foodItems.length; i++){
        if(foodItems[i].name === newName){
            alert("Invalid data! This food already exists.");
            return;
        }
    }
    const newServe = prompt("Please enter serving size (grams):", "100");
    if (validateData(newServe)) return;
    const newCals = prompt("Please enter calories per serve:");
    if (validateData(newCals)) return;
    const newPro = prompt("Please enter protein per serve (grams):");
    if (validateData(newPro)) return;
    const newCarbs = prompt("Please enter carbs per serve (grams):");
    if (validateData(newCarbs)) return;
    const newSod = prompt("Please enter sodium per serve (mg):");
    if (validateData(newSod)) return;

    const validCategories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Misc"];
    const newCat = capitalizeFirstLetter(prompt(`Please enter the category. Must be one of the following: 
        ${validCategories.join(", ")}.`));
    if(newCat === "Null") return;
    else if (!validCategories.includes(newCat)) {
        alert(`Invalid data! Category must be one of the following: ${validCategories.join(", ")}.`);
        return;
    }

    alert("New food item entered successfully!");
    // Use the validated values here
    foodItems.push(new Food(newName, newServe, newCals, newPro, newCarbs, newSod, newCat));
    sortFoodSelector();
    populateFoodSelector();

    saveToLocalStorage('foodItems', foodItems);

    // Reset amount content
    document.getElementById("amount-default").textContent = "1 serving = ";
    document.querySelector(".amount").value = "";
});

const delBtn = document.querySelector(".btn-delete-food");
delBtn.addEventListener("click", ()=>{
    foodToDelete = capitalizeFirstLetter(prompt("Type the name of the food you want to delete:"));
    console.log(foodToDelete);
    if(foodToDelete == "Null") return;
    let found = false;
    for(let i = 0; i < foodItems.length; i++){
        if (foodItems[i].name === foodToDelete){
            foodItems.splice(i, 1);
            alert(`${foodToDelete} has been deleted!`);
            found = true;
            break;
        }
    }
    if(!found){
        alert(`${foodToDelete} not found.`);
        return;
    }

    sortFoodSelector();
    populateFoodSelector();
    saveToLocalStorage('foodItems', foodItems);

    // Reset amount content
    document.getElementById("amount-default").textContent = "1 serving = ";
    document.querySelector(".amount").value = "";
});
