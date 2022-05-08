import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import App from '../App.js'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/Listlist'
import Table from '../pages/Listtable'
import Edit from '../pages/Edit'
import Means from '../pages/Means'

const baseRouter = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path='/table' element={<Table />}></Route>
        <Route path='/list' element={<List />}></Route>
        <Route path='/edit' element={<Edit />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
        <Route path='/means' element={<Means />}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  </Router>
)

export default baseRouter