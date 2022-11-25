import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage';
import DashboardProviderPage from './components/DashboardProviderPage';


function App() {

  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="App">
      {!isLogin && <LoginPage updateLogin={setIsLogin}/>}
      {isLogin && <DashboardProviderPage/>}
    </div>
  )
}

export default App
