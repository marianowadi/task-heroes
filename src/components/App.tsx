import React from 'react'

import { Navbar } from './Navbar'
import { TasksProvider } from './StatsProvider'
import { TaskList } from './TaskList'
import { TaskForm } from './TaskForm'

function App() {
  return (
    <TasksProvider>
      <div className="flex h-dvh flex-col  items-center bg-brand-yellow  p-6 font-sans">
        <Navbar />
        <TaskForm />
        <TaskList />
      </div>
    </TasksProvider>
  )
}

export default App
