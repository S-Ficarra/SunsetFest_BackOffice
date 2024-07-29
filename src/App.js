import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage/loginPage';
import DashboardPage from './views/DashboardPage/dashboadPage';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import createStore from 'react-auth-kit/createStore';
import UsersPage from './views/UsersPage/UsersPage';
import FaqsPage from './views/Publications/FAQs/FaqsPage';
import InformationsPage from './views/Publications/Informations/InformationsPage';
import NewsPage from './views/Publications/News/NewsPage';
import BandsPage from './views/Bands/BandsPage';
import ProgramPage from './views/ProgramPage/programPage';
import MapPage from './views/MapPage/MapPage';
import CountdownPage from './views/Countdowns/Countdown.Page';

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
                <Route path='/backoffice/utilisateurs/*' element={<UsersPage />}/>
                <Route path='/backoffice/faqs/*' element={<FaqsPage />}/>
                <Route path='/backoffice/informations/*' element={<InformationsPage />}/>
                <Route path='/backoffice/actualites/*' element={<NewsPage />}/>
                <Route path='/backoffice/groupes/*' element={<BandsPage />}/>
                <Route path='/backoffice/programme/2023/*' element={<ProgramPage />}/>
                <Route path='/backoffice/carte/*' element={<MapPage />}/>
                <Route path='/backoffice/countdown/*' element={<CountdownPage />}/>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
