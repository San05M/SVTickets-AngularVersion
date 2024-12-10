import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "./events/top-menu/top-menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-svtickets';
}
