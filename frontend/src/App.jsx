import { Routes, Route } from 'react-router-dom';
import './App.css'
import Account from './pages/Account';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;