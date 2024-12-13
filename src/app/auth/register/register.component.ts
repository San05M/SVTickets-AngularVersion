import { Component, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64.directive';
import { DatePipe } from '@angular/common';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { User } from '../../profile/interfaces/user';
import { CanComponentDeactivate } from '../../shared/guards/leave-page-guard.guard';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    FormsModule,
    EncodeBase64Directive,
    ReactiveFormsModule,
    ValidationClassesDirective,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements CanComponentDeactivate {

newUser: User = {
  name: ' ',
  email: ' ',
  avatar: ' ',
  lat: 0,
  lng: 0,
}

registerForm = new FormGroup({
  name: new FormControl(),
  email: new FormControl(),
  avatar: new FormControl(),
})

saved = false;

added  = output<User>();


canDeactivate() {
  if (this.registerForm.pristine) {
    return true;
  }
  return (
    this.saved ||
    confirm('Do you want to leave the page? Changes will be lost.')
  );
}
  // TODO: validate all the shield in the client side.
  /*
  - All fields are required. 
  - emails fields must be of a type email. 
  - password must have at least 4 characters. 
  - emails are equals (message: repeat email).
*/
  // TODO: geolocate.
}
