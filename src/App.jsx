import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Todo from './Components/Todo.jsx'
import Update from './Components/Update.jsx';
import Add from './Components/Add.jsx';
import User from './Components/UserSignup.jsx';
import UserLogin from './Components/UserLogin.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/signup" element={<User/>} />
         <Route path="/login" element={<UserLogin/>} />
      </Routes>



    </>
  )
}

export default App
