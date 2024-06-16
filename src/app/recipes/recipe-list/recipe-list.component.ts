import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipes.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private route: Router,
              private routes: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getService();
  }
  newReciipe() {
    this.route.navigate(['new'] , {relativeTo: this.routes});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
