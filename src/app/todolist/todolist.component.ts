import { Component, OnInit, Input } from '@angular/core';
import { Task, ToDo } from '../models';

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

  clearTasks() {
    this.todos.length = 0
  }
  
}
