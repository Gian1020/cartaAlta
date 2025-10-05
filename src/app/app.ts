import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MazzoFrancese } from './mazzo-francese/mazzo-francese';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MazzoFrancese],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('carte-alta');
}
