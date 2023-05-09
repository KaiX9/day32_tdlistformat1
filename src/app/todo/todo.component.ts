import { Component, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Task, ToDo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  toDoForm!: FormGroup
  taskArray!: FormArray

  fb: FormBuilder = inject(FormBuilder)

  @Output()
  parseToList = new Subject<ToDo>()

  ngOnInit(): void {
    this.toDoForm = this.createFormWithBuilder()
  }

  saveForm() {
    const todo: ToDo = this.toDoForm.value
    console.info('>>> saving details', todo)
    this.parseToList.next(todo)
    this.toDoForm = this.createFormWithBuilder()
  }

  addTask() {
    this.taskArray.push(this.createTask())
  }

  deleteTask(i: number) {
    this.taskArray.removeAt(i)
  }

  private createFormWithBuilder(): FormGroup {
    this.taskArray = this.fb.array([])
    return this.fb.group({
      title: this.fb.control<string>(''),
      name: this.fb.control<string>(''),
      tasks: this.taskArray
    })
  }

  private createTask(): FormGroup {
    return this.fb.group({
      task: this.fb.control<string>(''),
      priority: this.fb.control<string>(''),
      due: this.fb.control<string>('')
    })
  }

}
