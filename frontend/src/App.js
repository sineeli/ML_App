import LoginPage from "./Login";
import RegisterPage from "./Register";
import { useState } from "react";
import MainPage from "./Home"

export default function AppPage() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    // <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-400">
    //   {currentForm === 'login' ? <LoginPage onFormSwitch={toggleForm} /> : <RegisterPage onFormSwitch={toggleForm}/>}
    // </div>
    <div>
      <MainPage/>
    </div>
    
  );
}
