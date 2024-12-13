import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';


export const eventResolver: ResolveFn<User> = (route) => {
    const eventsService = inject(UserService);
    const router = inject(Router);

    return eventsService.getEvent(+route.params["id"]).pipe(
        catchError(() => {
            router.navigate([""]);
            return EMPTY;
        })
    );
};