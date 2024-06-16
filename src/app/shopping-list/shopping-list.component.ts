import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import {Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChanges: Subscription;
  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredient();
    this.igChanges = this.slService.listSelected.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingService.printLog('hello to ShoppingListComponent onInit');
  }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChanges.unsubscribe();
  }

}
