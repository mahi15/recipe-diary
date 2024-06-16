import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  toggleOpen(event: Event) {
    console.log('Clicked:', event.target);
    console.log('Dropdown Host:', this.elRef.nativeElement);
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    console.log('isOpen:', this.isOpen);
  }
}
