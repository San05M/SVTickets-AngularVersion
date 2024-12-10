import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { EventFormComponent } from '../../events/event-form/event-form.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const leavePageGuard: CanDeactivateFn<EventFormComponent> = (component) => {
  return component.canDeactivate()
};