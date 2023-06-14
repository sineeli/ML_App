import { useState } from 'react';
import {LoginPage} from './Login';
import {RegisterPage} from './Register'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className='App'>
      {
        currentForm === 'login' ? <LoginPage onFormSwitch={toggleForm} /> : <RegisterPage onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
