import { Component, Input, OnInit, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, ToDo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  toDoForm!: FormGroup
  taskArray!: FormArray

  fb: FormBuilder = inject(FormBuilder)

  @Input()
  todo: ToDo | null = null

  @Output()
  parseToList = new Subject<ToDo>()

  ngOnInit(): void {
    this.toDoForm = this.createFormWithBuilder()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const c = changes['todo']
    if (c.firstChange)
      return
    this.toDoForm = this.createEditedTodo(c.currentValue as ToDo)
  }

  saveForm() {
    const todo: ToDo = this.toDoForm.value
    console.info('>>> saving details', todo)
    this.parseToList.next(todo)
    this.toDoForm = this.createFormWithBuilder()
  }

  addTask() {
    this.taskArray.push(this.createTask(null))
  }

  deleteTask(i: number) {
    this.taskArray.removeAt(i)
  }

  invalidField(control: string): boolean {
    return !!(this.toDoForm.get(control)?.invalid && this.toDoForm.get(control)?.dirty)
  }

  invalidForm() {
    return this.toDoForm.invalid || this.taskArray.length <= 0
  }

  private createFormWithBuilder(): FormGroup {
    this.taskArray = this.fb.array([])
    return this.fb.group({
      title: this.fb.control<string>('', [ Validators.required ]),
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      tasks: this.taskArray
    })
  }

  private createTask(t: Task | null): FormGroup {
    return this.fb.group({
      task: this.fb.control<string>(!!t ? t.task : '', [ Validators.required, Validators.minLength(5) ]),
      priority: this.fb.control<string>(!!t ? t.priority : '', [ Validators.required ]),
      due: this.fb.control<string>(!!t ? t.due : '', [ Validators.required ])
    })
  }

  private createEditedTasks(tasks: Task[]): FormArray {
    return this.fb.array(
      tasks.map(t => this.createTask(t))
    )
  }

  private createEditedTodo(t: ToDo | null): FormGroup {
    this.taskArray = this.createEditedTasks(!!t ? t.tasks : [])
    return this.fb.group({
      title: this.fb.control<string>(!!t ? t.title : '', [ Validators.required ]),
      name: this.fb.control<string>(!!t ? t.name : '', [ Validators.required, Validators.minLength(3) ]),
      tasks: this.taskArray
    })
  }

}
