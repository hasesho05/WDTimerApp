export type MyList = {
  id: number
  icon?: string
  title: string
  tasks: Task[]
  isSelected?: boolean
}

export type Task = {
  id: number
  name: string
  duration: number
}
