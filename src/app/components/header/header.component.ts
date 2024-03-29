import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor() {}

  @Output() myEvent = new EventEmitter();
  @ViewChild('searchValue') searchValue!: ElementRef;

  ngAfterViewInit() {
    const inputElement = this.searchValue.nativeElement;

    fromEvent(inputElement, 'input')
      .pipe(
        debounceTime(1000), // Adjust the debounce time as per your needs
        distinctUntilChanged()
      )
      .subscribe((event: any) => {
        const value = (event.target as HTMLInputElement).value;
        this.myEvent.emit(value);
      });
  }
}
