import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataStorageService} from '../shared/data-storage';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
  templateUrl: 'header.component.html',
    styleUrls:  ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated = false;
  isLoading = false;
  constructor(private dataStorage: DataStorageService,
              private authService: AuthService,
              private router: Router) {}

   ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user;
    });
   }

   onLogout() {
    this.authService.logout();
   }

//   onSaveData() {
//     this.dataStorage.storeRecipes();
//   }
//   onFectchData() {
// this.dataStorage.fetchRecipes().subscribe();
//   }
}
