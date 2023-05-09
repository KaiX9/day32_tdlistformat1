export interface ToDo {
    title: string
    name: string
    tasks: Task[]
}

export interface Task {
    task: string
    priority: string
    due: string
}