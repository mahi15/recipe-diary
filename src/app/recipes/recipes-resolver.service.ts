import {DataStorageService} from '../shared/data-storage';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipes.model';
import {RecipeService} from './recipe.service';
@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getService();
    if (recipes.length === 0) {
    return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }
  }

}
