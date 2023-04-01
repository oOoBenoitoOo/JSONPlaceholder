import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Output() page: EventEmitter<number> = new EventEmitter();
  @Input() count!: number;
  @Input() activePage!: number;

  pageHandler = (value: PaginationAction): void => {
    if (typeof value === 'number') {
      this.activePage = value;
    } else {
      value === 'next' ? this.activePage++ : this.activePage--;
    }
    this.page.emit(this.activePage);
  };
}

type PaginationAction = number | 'prev' | 'next';
