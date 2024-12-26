let foodItems = /*loadFromLocalStorage("foodItems") ||*/ [
    // Breakfast items
    new Food("Uncle Toby's Oats", 40, 153, 5.1, 22.7, 2),
    new Food("Mixed Frozen Berries", 150, 61, 1.3, 10.3, 5),
    new Food("Lite Milk", 250, 111, 8.8, 11.5, 110),

    // Lunch items
    new Food("Apple", 120, 63, 0.31, 16.57, 0),
    new Food("Almonds", 30, 176, 5.9, 1.6, 5),
    // Dinner items

    // Misc
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
