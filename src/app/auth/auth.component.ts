import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, ResponseData} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceHolderDirective} from '../shared/placeHolder/placeHolder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy{
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective;

  private closeSub: Subscription;

  isLogedIn = true;
  islogin = true;
  isLoading =  false;
  error: string = null;
  constructor(private authService: AuthService,
              private router: Router,
              private ComponentFactory: ComponentFactoryResolver) {}

  onSwitched(data: string) {
    // this.isLogedIn = !this.isLogedIn;
    if (data === 'Signup') {
      this.islogin = false;
    } else {
      this.islogin = true;
    }
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<ResponseData>;

    this.isLoading = true;
    if (this.isLogedIn) {
    authObs = this.authService.login(email, password);
  } else {
    authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);

      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

    form.reset();
  }
  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertFactory = this.ComponentFactory.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
