import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipes.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';


@Injectable()
export class DataStorageService {
constructor(private http: HttpClient,
            private recipeService: RecipeService,
            private authService: AuthService) {}

storeRecipes() {
  const recipes = this.recipeService.getService();
  return this.http.put('https://shopping-cart-3f532.firebaseio.com/recipes.json',
    recipes
  )
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://shopping-cart-3f532.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}



