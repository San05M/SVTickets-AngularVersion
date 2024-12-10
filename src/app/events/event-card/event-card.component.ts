import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IntlCurrencyPipe } from '../../shared/pipes/intl-currency.pipe';
import { EventsService } from '../services/events-service';
import { MyEvent } from '../interfaces/my-event';

@Component({
  selector: 'event-card',
  standalone: true,
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
  imports: [IntlCurrencyPipe, DatePipe, RouterLink],
})

export class EventCardComponent {
  
  myEvent = input.required<MyEvent>();
  #eventService = inject(EventsService);
  #destroyRef = inject(DestroyRef);
  deleted = output<number>();

  deleteEvent() {
    this.#eventService
      .deleteEvent(this.myEvent().id!)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.deleted.emit(this.myEvent().id!));

  }
}