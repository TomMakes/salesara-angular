import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsaTypeAheadComponent } from "./core-ui/ssa-type-ahead/ssa-type-ahead.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SsaTypeAheadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'salesara-angular';
  testOptions = [
    { name: 'first option', value: '1' },
    { name: 'second option', value: '2' }
  ];
}
