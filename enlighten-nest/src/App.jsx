import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import FooterCom from './components/FooterCom';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import AdminOnlyPrivateRoute from './components/AdminOnlyPrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        <Route path="/projects" element={<Projects />} />
        <Route element={<AdminOnlyPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />}></Route>
        </Route>
      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}
export default App;