import React from 'react'

import { Navbar } from './Navbar'
import { TasksProvider } from './StatsProvider'
import { TaskList } from './TaskList'
import { TaskForm } from './TaskForm'
import { Footer } from './Footer'

function App() {
  return (
    <TasksProvider>
      <div className="flex h-dvh flex-col  items-center bg-brand-yellow  p-6 font-sans">
        <Navbar />
        <TaskForm />
        <TaskList />
        <Footer />
      </div>
    </TasksProvider>
  )
}

export default App
