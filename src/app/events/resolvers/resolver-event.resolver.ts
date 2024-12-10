import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { MyEvent } from '../interfaces/my-event';
import { EventsService } from '../services/events-service';

export const eventResolver: ResolveFn<MyEvent> = (route) => {
    const eventsService = inject(EventsService);
    const router = inject(Router);

    return eventsService.getEvent(+route.params["id"]).pipe(
        catchError(() => {
            router.navigate([""]);
            return EMPTY;
        })
    );
};