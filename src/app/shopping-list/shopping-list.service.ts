import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
export class ShoppingListService {
  listSelected = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple' , 5),
    new Ingredient('Tomatoes', 10),

  ];
  getIngredient() {
    return this.ingredients.slice();
  }
  getIngredients(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.listSelected.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.listSelected.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.listSelected.next((this.ingredients.slice()));
  }
  deleteIngredient(index: number ) {
    this.ingredients.splice(index, 1 );
    this.listSelected.next(this.ingredients.slice());
  }
}
