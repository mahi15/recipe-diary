import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const loadAuthModule = () => import('./auth/auth.module').then(m => m.AuthModule);
const loadRecipesModule = () => import('./recipes/recipes.module').then(m => m.RecipesModule);
const loadShopingList = () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule);

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {path: 'recipes', loadChildren: loadRecipesModule},
  {path: 'shopping-list', loadChildren: loadShopingList},
  {path: 'auth', loadChildren: loadAuthModule}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
