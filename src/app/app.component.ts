import { Component } from '@angular/core';
import { ToDo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  todos: ToDo[] = []
  todo: ToDo | null = null

  receiveList(t: ToDo) {
    const index = this.todos.findIndex(
      todo => todo.title === t.title)
    if (index !== -1) {
      this.todos[index] = t
    } else {
      this.todos.push(t)
    }
  }

  selectedTask(t: ToDo) {
    this.todo = t
    console.info('>>> selected task: ', this.todo)
  }
}
