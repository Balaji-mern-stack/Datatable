import logo from './logo.svg';
import './App.css';
import DataTableTask1 from './Components/DataTableTask1';
import DataTableTask2 from './Components/DataTableTask2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import EditClient from './Components/DataTableClient';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/data-table' element={<DataTableTask1/>}></Route>
      <Route path="/client" element={<DataTableTask2/>}></Route>
      <Route path="/edit-client/:id" element={<EditClient/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
