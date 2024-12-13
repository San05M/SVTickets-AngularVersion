import { Routes } from '@angular/router';
import { leavePageGuard } from '../shared/guards/leave-page-guard.guard';
import { numericIdGuard } from '../shared/guards/numeric-id-guard.guard';
import { eventResolver } from './resolvers/resolver-event.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./events-page/events-page.component').then(
        (m) => m.EventsPageComponent,
      ),
    title: 'Events',
  },
  {
    path: 'add',
    canDeactivate: [leavePageGuard],
    loadComponent: () =>
      import('./event-form/event-form.component').then(
        (m) => m.EventFormComponent,
      ),
    title: 'New Event ',
  },
  // DONE: change the  import to the new component for the edit the event.
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent,
      ),
      resolve: { event: eventResolver },
      title: 'Edit Event',
    },
    {
      path: ':id',
      canActivate: [numericIdGuard],
      loadComponent: () =>
        import('./event-detail/event-detail.component').then(
          (m) => m.EventDetailComponent,
        ),
      resolve: { event: eventResolver },
      title: 'Event ',
    },
  ];

/*DONE: the routers are bad indicate, change it. */