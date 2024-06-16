import {Recipe} from './recipes.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  //
  // private recipes: Recipe[] = [
  //
  //   new Recipe( 'Chiken briyani',
  //     'Hyderabadi dum briyani',
  //     'http://www.ndtv.com/cooks/images/hyderabadi%20biryani%20new.jpg',
  //     [
  //       new Ingredient('Meat', 2),
  //       new Ingredient('Curry', 2)
  //     ]),
  // new Recipe( 'Big Fat Burgur',
  // 'I am loving it',
  // 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/5/0/FNM' +
  //   '_060115-Fatbuger-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431449537270.jpeg',
  //   [
  //      new Ingredient('Meat', 2),
  //      new Ingredient('French Fries', 20)
  //   ]),
  //
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getService() {
    return this.recipes.slice();
  }
  getRecipes(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
