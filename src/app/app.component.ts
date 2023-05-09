import { Component } from '@angular/core';
import { ToDo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  todos: ToDo[] = []

  receiveList(t: ToDo) {
    this.todos.push(t)
  }

}
