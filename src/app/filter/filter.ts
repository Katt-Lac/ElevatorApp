import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrls: ['./filter.css']
})
export class Filter {
  @Output() filterChange = new EventEmitter<string>();

  onInput(event: any) {
    this.filterChange.emit(event.target.value);
  }
}
