/* Terminada. */
import { DatePipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { CanComponentDeactivate } from '../../shared/guards/leave-page-guard.guard';
import { minDateValidator } from '../../shared/validators/min-date.validators';
import { MyEvent } from '../interfaces/my-event';
import { EventsService } from '../services/events-service';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [
    FormsModule,
    EncodeBase64Directive,
    ReactiveFormsModule,
    ValidationClassesDirective,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements CanComponentDeactivate {
  newEvent: MyEvent = {
    title: '',
    description: '',
    price: 10,
    image: '',
    date: '',
  };

  today = new Date();

  datePipe = inject(DatePipe);

  eventForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-Z][a-zA-Z ]*/),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        minDateValidator(
          this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '',
        ),
      ],
    }),
  });

  saved = false;

  added = output<MyEvent>();
  #eventService = inject(EventsService);
  #router = inject(Router);

  addEvent() {
    const event: MyEvent = {
      ...this.eventForm.getRawValue(),
    };
    this.#eventService.addtEvent(event).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/events']);
    });
  }

  resetForm() {
    this.eventForm.reset();
  }

  canDeactivate() {
    if (this.eventForm.pristine) {
      return true;
    }
    return (
      this.saved ||
      confirm('Do you want to leave the page? Changes will be lost.')
    );
  }
}
