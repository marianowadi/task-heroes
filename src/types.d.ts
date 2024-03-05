export type Task = {
  uuid: string
  description: string
  done: boolean
  createdAt?: Date
  deadline?: string
}

export type State = { tasks: Task[] }
export type CreateActionPayload = {
  type: 'add'
  description: string
  deadline?: string
}
export type DeleteActionPayload = {
  type: 'delete'
  index: number
}
export type UpdateActionPayload = {
  type: 'update'
  description?: string
  done: boolean
  index: number
}
export type Action = {
  payload: CreateActionPayload | UpdateActionPayload | DeleteActionPayload
}
