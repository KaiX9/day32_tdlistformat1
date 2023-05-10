import { Component, OnInit, Input, Output } from '@angular/core';
import { Task, ToDo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  task!: ToDo
  tasks: Task[] = []

  ngOnInit(): void {
  }

  @Input()
  todos: ToDo[] = []

  @Output()
  onSelectedTodo = new Subject<ToDo>()

  clearTasks(i: number) {
    this.todos.splice(i, 1)
  }

  editTask(i: number) {
    this.onSelectedTodo.next(this.todos[i])
  }
  
}
