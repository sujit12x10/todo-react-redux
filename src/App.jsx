import { AddTodo } from './components/AddTodo'
import { Todos } from './components/Todos'
import './App.css'

function App() {

  return (
    <div className='main-container'>
      <h1 className='heading'>MY TODO LIST</h1>
      <AddTodo />
    </div>
  )
}

export default App
