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
    const newItem = {
        name: food.name,
        serveSize: amount,
        cals: food.cals * scale,
        pro: food.protein * scale,
        carbs: food.carbs * scale,
        sod: food.sodium * scale
    }
    eatenFoods.push(newItem);
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
        totalCals += food.cals;
        totalProtein += food.protein;
        totalCarbs += food.carbs;
        totalSodium += food.sodium;
    }
}

function resetDay(){
    eatenFoods = [];
    calcTotals();
}

// Initialize the default food items
const oats = new Food("Uncle Toby's Oats", 40, 153, 5.1, 22.7, 2);
const frozenBerries = new Food("Mixed Frozen Berries", 150, 61, 1.3, 10.3, 5);
const liteMilk = new Food("Lite Milk", 250, 111, 8.8, 11.5, 110);
let foodItems = [oats, frozenBerries, liteMilk];

// Initialize the 'eaten foods' array
let eatenFoods = [];

// Initialize the totals
let totalCals = 0;
let totalProtein = 0;
let totalCarbs = 0;
let totalSodium = 0;