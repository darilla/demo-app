import server from './server/serverMock';
import moment from 'moment';

export function caloriesPerDay(calories, fat, protein, carbs) {
  var howMuchKcal = {
    fat: calories * (fat / 100),
    protein: calories * (protein / 100),
    carbs: calories * (carbs / 100)
  };
  return howMuchKcal;
}

export function aliment(fat, protein, carbs) {
  // Nutritions in grams
  const aliment = {
    fat: fat * 9,
    protein: protein * 4,
    carbs: carbs * 4
  };
  return aliment; // Object contains nutritions in kcal
}

export function countGrams(aliment) {
  var howMuchCalories = {
    fat: Math.floor(aliment.fat / 9),
    protein: Math.floor(aliment.protein / 4),
    carbs: Math.floor(aliment.carbs / 4)
  };
  return howMuchCalories;
}

export function sumFoods(food1, food2) {
  // no test
  return {
    fat: food1.fat + food2.fat,
    protein: food1.protein + food2.protein,
    carbs: food1.carbs + food2.carbs
  };
}

export function sumMeals(meal1, meal2) {} // no test

export function countKcalInFood(food) {
  return food.fat * 9 + food.protein * 4 + food.carbs * 4;
}

export function countKcalInMeal(meal) {
  // no test
  return countKcalInFood(
    meal.foods.reduce(sumFoods, { fat: 0, carbs: 0, protein: 0 })
  );
}

export function portion(aliment, quantity) {
  //Aliment contains nutritions in grams
  const portion = {
    fat: aliment.fat * quantity / 100,
    protein: aliment.protein * quantity / 100,
    carbs: aliment.carbs * quantity / 100
  };
  return portion;
}

export function fetchProducts() {
  return server.listAllProducts();
}

export function convertFoodsFromServer(productsFromServer) {
  //no test
  const products = {};
  for (let name in productsFromServer) {
    const productFromServer = productsFromServer[name];
    let foodConverted = convertFoodFromServer(productFromServer);
    products[productFromServer.id] = foodConverted[productFromServer.id];
  }
  return products;
}

export function convertFoodFromServer(object) {
  // no test
  return { [object.id]: object };
}

export function convertObjectToArray(object) {
  //no test
  const newArray = [];
  for (let key in object) {
    newArray.push(object[key]);
  }
  return newArray;
}

export function findMealByClosestTime(currentTime, meals) {
  function countTimeInMinutesFrom(time) {
    return time.hour() * 60 + time.minutes();
  }

  let currentTimeInSeconds = countTimeInMinutesFrom(currentTime);
  let twoClosestMeals = [];
  let twoDifferences = [];
  let theClosestMeal = {};

  if (!meals || meals.length === 0) {
    return {};
  } else if (meals.length === 1) {
    theClosestMeal = meals[0];
  } else {
    for (let i = 0; i < meals.length - 1; i++) {
      let isBetween = moment(currentTimeInSeconds).isBetween(
        meals[i].seconds,
        meals[i + 1].seconds
      );
      let isSameAs1stHour = moment(currentTimeInSeconds).isSame(
        meals[i].seconds
      );
      let isAftertheLastMeal = moment(currentTimeInSeconds).isAfter(
        meals[meals.length - 1].seconds
      );
      let isBefore3AM = currentTimeInSeconds < 180;
      let isBefore8AM = currentTimeInSeconds < 480;

      if (isAftertheLastMeal || isBefore3AM) {
        theClosestMeal = meals[meals.length - 1];
        return theClosestMeal;
      } else if (isBefore8AM && !isBetween && !isSameAs1stHour) {
        theClosestMeal = meals[0];
        return theClosestMeal;
      } else if (isBetween || isSameAs1stHour) {
        twoClosestMeals.push(meals[i]);
        twoClosestMeals.push(meals[i + 1]);

        twoDifferences.push(currentTimeInSeconds - meals[i].seconds);
        twoDifferences.push(meals[i + 1].seconds - currentTimeInSeconds);
      }
    } //end of for loop

    if (twoDifferences[0] < twoDifferences[1]) {
      theClosestMeal = twoClosestMeals[0];
    } else {
      theClosestMeal = twoClosestMeals[1];
    }
  }
  return theClosestMeal;
}
