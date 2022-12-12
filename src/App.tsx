import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage';
import DashboardProviderPage from './components/DashboardProviderPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import RegisterPage from './components/RegisterPage';

function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/dashboard" element={<DashboardProviderPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
