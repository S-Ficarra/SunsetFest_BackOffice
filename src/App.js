import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/loginPage/loginPage';
import DashboardPage from './views/dashboardPage/dashboadPage';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import createStore from 'react-auth-kit/createStore';
import UsersPage from './views/usersPage/usersPage';



export const BASE_URL = 'http://localhost:3000/'

function App() {

  const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
  });

  return (
    <AuthProvider store={store}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/backoffice/login' element={<LoginPage />} />
              <Route element={<AuthOutlet fallbackPath='/backoffice/login' />}>
                <Route path='*' element={<DashboardPage />}/>
                <Route path='/backoffice/dashboard' element={<DashboardPage />}/>
                <Route path='/backoffice/utilisateurs' element={<UsersPage />}/>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
