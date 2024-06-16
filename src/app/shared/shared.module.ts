import {NgModule} from '@angular/core';
import {LoaderSpinnerComponent} from './loader/loader.spinner.component';
import {AlertComponent} from './alert/alert.component';
import {PlaceHolderDirective} from './placeHolder/placeHolder.directive';
import {DropdownDirectiveDirective} from './dropdown-directive.directive';
import {CommonModule} from '@angular/common';
import {LoggingService} from '../logging.service';

@NgModule({
  declarations: [
    LoaderSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
    DropdownDirectiveDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DropdownDirectiveDirective,
    LoaderSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
    CommonModule
  ],
  entryComponents: [
    AlertComponent
  ],
  providers: [LoggingService]
})
export class SharedModule {}
