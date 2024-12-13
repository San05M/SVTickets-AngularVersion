import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
import { MyEvent } from '../interfaces/my-event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'events-page',
  standalone: true,
  imports: [ FormsModule, EventCardComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
  #eventService = inject(EventsService);

  events = signal<MyEvent[]>([]);

  search = signal('');

  filteredEvents = computed(() => {
    const searchLower = this.search()?.toLocaleLowerCase();
    console.log(this.events())
    return searchLower
      ? this.events().filter(
          (ev) =>
            ev.title.toLocaleLowerCase().includes(searchLower) ||
            ev.description.toLocaleLowerCase().includes(searchLower)
        )
      : this.events();
  });

  constructor() {
    this.#eventService
      .getEvents()
      .pipe(takeUntilDestroyed())
      .subscribe((events) => this.events.set(events));
  }

  addEvent(myEvent: MyEvent) {
    this.events.update((events) => [...events, myEvent]);
  }

  deleteEvent(myEvent: MyEvent) {
    console.log(this.events())
    this.events.update((events) => events.filter((e) => e.id !== myEvent.id));
    
    console.log(this.events())
  }

  orderByPrice() {
    this.events.set(
      this.events().toSorted((ev1, ev2) => ev1.price - ev2.price)
    );
  }

  orderByDate() {
    this.events.set(
      this.events().toSorted(
        (ev1, ev2) =>
          new Date(ev1.date).getTime() - new Date(ev2.date).getTime()
      )
    );
  }
}