import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import {CookiesProvider} from 'react-cookie'
import UserLogin from './Components/UserLogin'
import UserRegister from './Components/UserRegister';
import UserHome from './Components/UserHome';

function Router(){

  return(
    <CookiesProvider>
    <BrowserRouter>

      <Routes>
        <Route path = '/' element = {<UserLogin/>}/>
        <Route path = '/admin' element = {<Login/>}/>
        <Route path = '/adminhome' element = {<App/>}/>
        <Route path = '/userregister' element = {<UserRegister/>}/>
        <Route path = '/userHome' element = {<UserHome/>}/>



      </Routes>
    
    </BrowserRouter>
    </CookiesProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
