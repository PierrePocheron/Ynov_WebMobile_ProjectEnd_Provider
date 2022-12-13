import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage';
import MyAppointmentPage from './components/MyAppointmentPage';
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
          <Route path="" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage updateLogin={setIsLogin} />} />
          <Route path="/my-appointment" element={<MyAppointmentPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
