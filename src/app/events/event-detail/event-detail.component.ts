import {
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventCardComponent } from "../event-card/event-card.component";
import { MyEvent } from '../interfaces/my-event';

@Component({
  selector: 'event-detail',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent {

  #title = inject(Title);
  #router = inject(Router);

  event = input.required<MyEvent>();

  constructor() {
    effect(() => {
      console.log(this.event());
      
      if(this.event()){
        this.#title.setTitle(this.event()!.title);
      }
    });
  }

  goBack(){
    this.#router.navigate(['/events']);
  }
}
