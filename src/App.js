import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/loginPage/loginPage';
import DashboardPage from './views/dashboardPage/dashboadPage';


export const BASE_URL = 'http://localhost:3000/'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/backoffice/login' element={<LoginPage/>} />
          <Route path='/backoffice/dashboard' element={<DashboardPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
